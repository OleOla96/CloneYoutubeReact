import { http } from '../common/http'
import axios from 'axios'

export const search = async (q, type = 'less') => {
  try {
    const res = await axios.get(http + 'search/title', {
      params: {
        q,
        type,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
