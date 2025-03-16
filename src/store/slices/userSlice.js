import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://reqres.in/api'

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users?page=1&per_page=12`)
      // Add status and role to each user
      const enhancedUsers = response.data.data.map(user => ({
        ...user,
        status: user.id % 2 === 0 ? 'active' : 'inactive', // Alternate between active and inactive
        role: user.id % 3 === 0 ? 'admin' : 'user', // Every third user is an admin
      }))
      return {
        ...response.data,
        data: enhancedUsers,
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Failed to fetch users')
    }
  }
)

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData)
      // Since this is a mock API, we'll create a more complete user object
      // that matches the structure of users we get from fetchUsers
      return {
        id: response.data.id || Math.floor(Math.random() * 1000) + 100, // Fallback ID if API doesn't provide one
        email: userData.email,
        first_name: userData.name.split(' ')[0],
        last_name: userData.name.split(' ')[1] || '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
        status: 'active',
        role: 'user'
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Failed to add user')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(profileData),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return rejectWithValue('Failed to update profile')
    }
  }
)

const initialState = {
  users: [],
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.data
        state.totalPages = action.payload.total_pages
        state.currentPage = action.payload.page
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = [action.payload, ...state.users]
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = userSlice.actions
export default userSlice.reducer 