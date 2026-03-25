import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    extends: [
      '@repo/eslint-config/react-vite',
    ],
    files: ['**/*.{ts,tsx}'],
  },
])
