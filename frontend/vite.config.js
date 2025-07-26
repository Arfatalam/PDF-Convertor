import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

[
    {
        "type": "command",
        "details": {
            "key": "npm.runInstall"
        }
    },
    {
        "type": "command",
        "details": {
            "key": "workbench.extensions.installMissingDependencies"
        }
    },
    {
        "type": "command",
        "details": {
            "key": "npm.runScript"
        }
    }
]