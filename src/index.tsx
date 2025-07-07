import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import "react-loading-skeleton/dist/skeleton.css"
import { BrowserRouter } from "react-router-dom"
import { ThemeWrapper } from "./common/theme/ThemeWrapper"
import App from "./app/App"
import { store } from "./app/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </Provider>
  </BrowserRouter>,
)
