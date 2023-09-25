import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import NavbarDashboard from '../../components/Dashboard/Navbar/NavbarDashboard.component'
import MainDashboardPage from '../../components/Dashboard/MainPage/MainDashboardPage'
import HomeDashbord from '../../components/Dashboard/HomePage/HomeDashbord.component'
import CreateDir from '../../components/Dashboard/createDirectory/createDir'
import { getAllDirs, getAllFiles } from '../../redux/createActions/createItemsAction'
import DirCmponent from '../../components/Dashboard/DirComponent/DirCmponent'
import CreateFile from '../../components/Dashboard/createFile/createFile'
import FileComponent from '../../components/Dashboard/FileComponent/File.component'
import UploadFile from '../../components/Dashboard/UploadFile/UploadFile'


const Dashboard = () => {
  const [newDirModal, setNewDirModal] = useState(false)
  const [newFileM, setNewFileM] = useState(false)
  const [showMainPage, setShowMainPage] = useState(true)
  const [uploadFileMO, setUploadFileMO] = useState()

  const {isLoggedin, isLoading, userId} = useSelector(state => ({isLoggedin: state.auth.isAuthenticated,
    isLoading: state.fileFolders.isLoading,
    userId: state.auth.user.uid
  }), shallowEqual)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if(!isLoggedin){
      navigate("/")
    }
  }, [])

  useEffect(() => {
    if(isLoading && userId){
      dispatch(getAllDirs(userId))
      dispatch(getAllFiles(userId))
    }
  }, [isLoading, userId, dispatch])

  useEffect(() => {
    if (window.location.pathname.includes("/file")){
      setShowMainPage(false)
    } else{
      setShowMainPage(true)
    }
  }, [window.location.pathname])

  
  return (
    <>
      {newDirModal &&(<CreateDir setNewDirModal={setNewDirModal}/>)}
      {newFileM &&(<CreateFile setNewFileMO={setNewFileM}/>)}
      {uploadFileMO &&(<UploadFile setUploadFileMO={setUploadFileMO}/>)}
      <NavbarDashboard/>
      {
        showMainPage && (<MainDashboardPage setNewDirModal={setNewDirModal} setNewFileM={setNewFileM} setUploadFileMO={setUploadFileMO} />)
      }
      <Routes>
        <Route path="" element={<HomeDashbord/>} />
        <Route path="folder/:dirId" element={<DirCmponent/>} />
        <Route path="file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  )
}

export default Dashboard