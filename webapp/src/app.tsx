import { ConfigProvider, App as AntdApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { BrowserRouter, Route, Routes } from 'react-router'

import { ring2 } from 'ldrs'

ring2.register()

import theme from './theme'

import PageLayout from './pages/_layout'
import GeneratorPage from './pages/generator'
import PreviewPage from './pages/preview'
import Docs from './pages/docs'

import './app.css'

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <StyleProvider layer>
        <AntdApp>
          <BrowserRouter>
            <Routes>
              <Route element={<PageLayout />}>
                <Route path="/" element={<GeneratorPage />} />
                <Route path="/preview" element={<PreviewPage />} />
                <Route path="/docs" element={<Docs />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AntdApp>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default App
