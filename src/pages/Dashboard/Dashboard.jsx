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


const Dashboard = () => {
  const [newDirModal, setNewDirModal] = useState(false)
  const [newFileM, setNewFileM] = useState(false)

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

  return (
    <>
    {newDirModal &&(<CreateDir setNewDirModal={setNewDirModal}/>)}
    {newFileM &&(<CreateFile setNewFileMO={setNewFileM}/>)}
        <NavbarDashboard/>
        <MainDashboardPage setNewDirModal={setNewDirModal} setNewFileM={setNewFileM}/>
        <Routes>
          <Route path="" element={<HomeDashbord/>} />
          <Route path="folder/:dirId" element={<DirCmponent/>} />
        </Routes>
    </>
  )
}

export default Dashboard