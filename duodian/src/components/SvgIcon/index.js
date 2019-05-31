import SvgIcon from './icons'
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/icons', false, /\.svg$/)
requireAll(req)

export default {
  SvgIcon
}
