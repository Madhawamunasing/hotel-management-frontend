import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Exception404 from '../Pages/Exception/PageNotFound404'
import React from 'react'

const exceptionsRouters = <Route path='*' element={<Exception404 />}></Route>

export default exceptionsRouters
