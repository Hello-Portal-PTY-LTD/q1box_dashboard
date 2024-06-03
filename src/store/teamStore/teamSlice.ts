import {createSlice, current} from '@reduxjs/toolkit'
import {
  getTeamMembers,
  sendInvite,
  searchTeamMembers,
  updateMember,
  deleteMember,
} from './teamAction'

interface teamState {
  loading: boolean
  team: any
  deletedMembers: any
  error: any
}
interface TeamMember {
  role: string
  status: boolean
  joiningDate: Date | null
  email: string
  name: string
  createdBy: any // Replace with the actual type of createdBy
  id: string
  response: string // Assuming response is a string, replace with the actual type
}

// const team = {
//   role: '',
//   status: false,
//   joiningDate: null,
//   email: '',
//   name: '',
//   createdBy: {},
//   id: '',
// }
const initialState: teamState = {
  loading: false,
  team: {
    list: [],
    pagination: {},
  },
  deletedMembers: {
    list: [],
    pagination: {},
  },
  error: '',
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTeamMembers.fulfilled, (state, action) => {
        state.loading = false
        const result = action.payload.res
        if (!action.payload.isDeleted) {
          state.team.list = result.users
          state.team.pagination = result.pagination
        } else if (action.payload.res) {
          state.deletedMembers.list = result.users
          state.deletedMembers.pagination = result.pagination
        }
      })
      .addCase(getTeamMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchTeamMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchTeamMembers.fulfilled, (state, action) => {
        state.loading = false
        const result = action.payload
        state.team.list = result.users
        state.team.pagination = result.pagination
      })
      .addCase(searchTeamMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(sendInvite.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendInvite.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(sendInvite.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateMember.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false
        const user = action.payload.user
        const d = current(state.team.list)
        state.team.list = d.map((t: TeamMember) => (t.id === user.id ? {...t, ...user} : t))
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteMember.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default teamSlice.reducer
