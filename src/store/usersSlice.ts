import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { User } from "../types";
import { RootState } from "./store";

export interface UsersState {
  users: User[];
  fetchStatus: "idle" | "loading" | "success" | "failed";
  addStatus: "idle" | "loading" | "success" | "failed";
  deleteStatus: "idle" | "loading" | "success" | "failed";
}

const initialState: UsersState = {
  users: [],
  fetchStatus: "idle",
  addStatus: "idle",
  deleteStatus: "idle",
};

export const registerUser = createAsyncThunk(
  "users/postUser",
  async (user: Omit<User, "_id">) => {
    const { data } = await api.post("/employees", user);
    return data;
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await api.get("/employees");
  return data;
});

export const updateUser = createAsyncThunk<
  User,
  { userId: string; user: Omit<User, "_id"> }
>("users/putUser", async ({ userId, user }) => {
  await api.put(`/employees/${userId}`, user);
  return { ...user, _id: userId };
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    await api.delete(`/employees/${userId}`);
    return userId;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.addStatus = "idle";
          state.users = [...state.users, payload];
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.addStatus = "failed";
      })
      .addCase(updateUser.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(
        updateUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.addStatus = "idle";
          const updatedUser = state.users;
          const userToUpdateIndex = updatedUser.findIndex(
            (user) => user.id === payload.id
          );
          updatedUser.splice(userToUpdateIndex, 1, payload);
          state.users = updatedUser;
        }
      )
      .addCase(updateUser.rejected, (state) => {
        state.addStatus = "failed";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.fetchStatus = "idle";
          state.users = payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
      })
      .addCase(
        deleteUser.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.deleteStatus = "idle";
          state.users = state.users.filter((user) => user.id !== payload);
        }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = "failed";
      });
  },
});

export const selectUsers = (state: RootState) => state.usersSlice.users;
export const selectUsersFetchStatus = (state: RootState) =>
  state.usersSlice.fetchStatus;
export const selectUsersAddStatus = (state: RootState) =>
  state.usersSlice.addStatus;

export default usersSlice.reducer;
