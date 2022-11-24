import usersReducer, {
  deleteUser,
  fetchUsers,
  registerUser,
  updateUser,
  UsersState,
} from "./usersSlice";

describe("users reducer", () => {
  const initialState: UsersState = {
    users: [],
    fetchStatus: "idle",
    addStatus: "idle",
    deleteStatus: "idle",
  };

  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual({
      users: [],
      fetchStatus: "idle",
      addStatus: "idle",
      deleteStatus: "idle",
    });
  });

  it("should set fetchStatus to loading", () => {
    const actual = usersReducer(initialState, {
      type: fetchUsers.pending.type,
    });
    expect(actual.fetchStatus).toEqual("loading");
  });

  it("should register a new employee", () => {
    const actual = usersReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: REGISTER_PAYLOAD,
    });
    expect(actual.users).toEqual([REGISTER_PAYLOAD]);
  });

  it("should update employee", () => {
    const register = usersReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: REGISTER_PAYLOAD,
    });
    expect(register.users).toEqual([REGISTER_PAYLOAD]);

    const actual = usersReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: UPDATE_PAYLOAD,
    });
    expect(actual.users).toEqual([UPDATE_PAYLOAD]);
  });

  it("should delete employee", () => {
    const register = usersReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: REGISTER_PAYLOAD,
    });
    expect(register.users).toEqual([REGISTER_PAYLOAD]);

    const actual = usersReducer(initialState, {
      type: deleteUser.fulfilled.type,
      payload: 1,
    });
    expect(actual.users).toEqual([]);
  });
});

const REGISTER_PAYLOAD = {
  _id: "1",
  name: "Fernando Lopes",
  email: "fernando@mail.com",
  gender: "male",
  startDate: "06/2022",
  birthDate: "1992-06-13",
  cpf: "08875457425",
  team: "frontend",
};
const UPDATE_PAYLOAD = {
  _id: "1",
  name: "Fernando",
  email: "fernando@mail.com",
  gender: "male",
  startDate: "06/2022",
  birthDate: "1992-06-13",
  cpf: "08875457425",
  team: "frontend",
};
