import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type User, fakeData} from './makeData';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, User>>({});

 const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
//   {
//     accessorKey: 'id',
//     header: 'ID',
//     enableEditing: false,
//     size: 80,
//   },
  {
    accessorKey: 'name',
    header: 'Name',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'text',
      required: true,
      error: !!validationErrors?.[cell.id],
      helperText: validationErrors?.[cell.id],
      onBlur: (event) => {
        const validationError = !validateRequired(event.currentTarget.value)
          ? 'Required'
          : undefined;
        setValidationErrors({
          ...validationErrors,
          [cell.id]: validationError,
        });
        setEditedUsers({ ...editedUsers, [row.id]: row.original });
      },
    }),
  },
  {
    accessorKey: 'topping',
    header: 'Topping',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'text',
      required: true,
      error: !!validationErrors?.[cell.id],
      helperText: validationErrors?.[cell.id],
      onBlur: (event) => {
        const validationError = !validateRequired(event.currentTarget.value)
          ? 'Required'
          : undefined;
        setValidationErrors({
          ...validationErrors,
          [cell.id]: validationError,
        });
        setEditedUsers({ ...editedUsers, [row.id]: row.original });
      },
    }),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'number',
      required: true,
      error: !!validationErrors?.[cell.id],
      helperText: validationErrors?.[cell.id],
      onBlur: (event) => {
        const validationError = !validateRequired(event.currentTarget.value)
          ? 'Required'
          : undefined;
        setValidationErrors({
          ...validationErrors,
          [cell.id]: validationError,
        });
        setEditedUsers({ ...editedUsers, [row.id]: row.original });
      },
    }),
  },
  {
    accessorKey: 'customerNo',
    header: 'Customer No',
    muiEditTextFieldProps: ({ cell, row }) => ({
      type: 'text',
      required: true,
      error: !!validationErrors?.[cell.id],
      helperText: validationErrors?.[cell.id],
      onBlur: (event) => {
        const validationError = !validateRequired(event.currentTarget.value)
          ? 'Required'
          : undefined;
        setValidationErrors({
          ...validationErrors,
          [cell.id]: validationError,
        });
        setEditedUsers({ ...editedUsers, [row.id]: row.original });
      },
    }),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    muiEditTextFieldProps: ({ cell }) => ({
      type: 'text',
      required: true,
      error: !!validationErrors?.[cell.id],
      helperText: validationErrors?.[cell.id],
    }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    editVariant: 'select',
    editSelectOptions: [
      { value: 'delivered', label: 'Delivered' },
      { value: 'ready', label: 'Ready' },
      { value: 'received', label: 'Received' },
    ],
    // muiEditTextFieldProps: ({ row }) => ({
    //   select: true,
    //   error: !!validationErrors?.status,
    //   helperText: validationErrors?.status,
    //   onChange: (event) =>
    //     setEditedUsers({
    //       ...editedUsers,
    //       [row.id]: { ...row.original, status: event.target.value },
    //     }),
    // }),
  },
], [editedUsers, validationErrors]);


  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUsers, isPending: isUpdatingUsers } =
    useUpdateUsers();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUsers = async () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    await updateUsers(Object.values(editedUsers));
    setEditedUsers({});
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

   console.log(openDeleteConfirmModal)

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    // enableRowActions: true,
    // positionActionsColumn: 'last',
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    // renderRowActions: ({ row }) => (
    //   <Box sx={{ display: 'flex', gap: '1rem' }}>
    //     <Tooltip title="Delete">
    //       <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Tooltip>
    //   </Box>
    // ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveUsers}
          disabled={
            Object.keys(editedUsers).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          {isUpdatingUsers ? <CircularProgress size={25} /> : 'Save'}
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        sx={{color:"GrayText"}}
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Package
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUsers || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      //send api update request here
      console.log(user)
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as User[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (users: User[]) => {
      //send api update request here
      console.log(users)
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUsers: User[]) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.map((user: User) => {
          const newUser = newUsers.find((u) => u.id === user.id);
          return newUser ? newUser : user;
        }),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const validateUser = (values: User) => {
  const errors: Record<string, string | undefined> = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.topping) {
    errors.topping = 'Topping is required';
  }
  if (values.quantity === undefined || values.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }
  if (!values.customerNo) {
    errors.customerNo = 'Customer No is required';
  }
  if (!values.createdAt) {
    errors.createdAt = 'Created At is required';
  }
  if (!values.status) {
    errors.status = 'Status is required';
  }

  return errors;
};

// Example component code continues here...


//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      //send api update request here
      console.log(userId)
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.filter((user: User) => user.id !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;

