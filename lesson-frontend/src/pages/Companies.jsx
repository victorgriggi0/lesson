// Importações de Bibliotecas e Frameworks
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Badge,
  Box,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Select,
  ThemeProvider,
  Toolbar,
  createTheme,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importações de Componentes
import { AccountMenu } from "../components/AccountMenu";
import { AlertDialog } from "../components/AlertDialog";
import { ButtonCancel } from "../components/ButtonCancel";
import { ButtonConfirm } from "../components/ButtonConfirm";
import { ButtonCreateItem } from "../components/ButtonCreateItem";
import { CircularProgressButtonStyled } from "../components/CircularProgressButtonStyled";
import { CircularProgressListStyled } from "../components/CircularProgressListStyled";
import { Company } from "../components/Company";
import { Copyright } from "../components/Copyright";
import { HeadingText } from "../components/HeadingText";
import { InputText } from "../components/InputText";
import { InputTextMultiline } from "../components/InputTextMultiline";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
} from "../components/ListItems";
import { PageTitle } from "../components/PageTitle";
import { PaginationStyled } from "../components/PaginationStyled";

// Importações de Serviços
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../services/companies";
import { getAllConditions } from "../services/conditions";
import {
  getUserInformation,
  isPartnershipManager,
  isSystemCoordinator,
} from "../utils/userUtils";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function Companies() {
  // Estados
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [allConditionsList, setAllConditionsList] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(10);

  //
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  //
  useEffect(() => {
    async function fetchUserInformation() {
      const result = await getUserInformation();
      setUserInformation(result);
    }
    fetchUserInformation();
  }, []);

  useEffect(() => {
    findCompanies();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const fetchAllConditions = async () => {
      try {
        const result = await getAllConditions();
        const conditions = result.conditions;
        setAllConditionsList(conditions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllConditions();
  }, []);

  // Hooks de formulário para validação
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Funções assíncronas
  async function findCompanies() {
    try {
      setIsSearching(true);
      const result = await getCompanies(currentPage, pageSize);
      setCompanies(result.companies);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
    } catch (error) {
      setResult({
        title: "Uh, oh!",
        message:
          error.response?.data?.error ||
          "Por favor, informe-nos sobre este erro para que possamos resolvê-lo. Se precisar de assistência imediata, entre em contato conosco. Pedimos desculpas pelo inconveniente e agradecemos pela sua colaboração!",
      });
    } finally {
      setIsSearching(false);
    }
  }

  async function addCompany(data) {
    try {
      setIsCreating(true);
      await createCompany(data);
      setIsCreated(false);
      showSuccessToast(
        "Nova adição: o conteúdo foi criado conforme solicitado."
      );
      await findCompanies();
    } catch (error) {
      setResult({
        title: "Uh, oh!",
        message:
          error.response?.data?.error ||
          "Por favor, informe-nos sobre este erro para que possamos resolvê-lo. Se precisar de assistência imediata, entre em contato conosco. Pedimos desculpas pelo inconveniente e agradecemos pela sua colaboração!",
      });
    } finally {
      setIsCreating(false);
    }
  }

  async function editCompany(data) {
    try {
      await updateCompany(data);
      showSuccessToast("Sucesso na edição: as alterações foram salvas.");
      await findCompanies();
    } catch (error) {
      setResult({
        title: "Uh, oh!",
        message:
          error.response?.data?.error ||
          "Por favor, informe-nos sobre este erro para que possamos resolvê-lo. Se precisar de assistência imediata, entre em contato conosco. Pedimos desculpas pelo inconveniente e agradecemos pela sua colaboração!",
      });
    }
  }

  async function removeCompany(data) {
    try {
      await deleteCompany(data);
      showSuccessToast("Exclusão bem-sucedida: o conteúdo foi removido.");
      await findCompanies();
    } catch (error) {
      setResult({
        title: "Uh, oh!",
        message:
          error.response?.data?.error ||
          "Por favor, informe-nos sobre este erro para que possamos resolvê-lo. Se precisar de assistência imediata, entre em contato conosco. Pedimos desculpas pelo inconveniente e agradecemos pela sua colaboração!",
      });
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <AlertDialog
        show={result}
        title={result?.title}
        message={result?.message}
        handleClose={() => setResult(null)}
      />

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ background: "#171717" }}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <PageTitle props={"Empresas"} />
            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountMenu />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
            <Divider sx={{ my: 1 }} />
            {tertiaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/*  */}
            {userInformation &&
              (isSystemCoordinator(userInformation) ||
                isPartnershipManager(userInformation)) && (
                <ButtonCreateItem onClick={() => setIsCreated(true)} />
              )}

            {/* Filtro */}

            {/*  */}
            {isSearching ? (
              <CircularProgressListStyled />
            ) : (
              <Box>
                {companies.length > 0 ? (
                  companies.map((company, index) => (
                    <Company
                      key={index}
                      company={company}
                      editCompany={editCompany}
                      removeCompany={removeCompany}
                    />
                  ))
                ) : (
                  <p className="text-center">
                    No momento ainda não existe nenhum dado para a categoria
                    selecionada.
                  </p>
                )}

                {/* Paginação */}
                <PaginationStyled
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                />
              </Box>
            )}

            {/* Modal de criação. O ideal seria componentizar, pois é parecido com o modal de editar */}
            <Dialog
              open={isCreated}
              onClose={() => setIsCreated(false)}
              fullWidth
            >
              <form onSubmit={handleSubmit(addCompany)}>
                <DialogTitle>
                  {" "}
                  <HeadingText props={"Novo Registro de Dados"} />
                </DialogTitle>

                <DialogContent>
                  <InputTextMultiline
                    name={"companyName"}
                    label={"Nome"}
                    type={"text"}
                    id={"companyName"}
                    error={errors.companyName}
                    helperText={
                      errors.companyName && errors.companyName.message
                    }
                    inputProps={{
                      ...register("companyName", {
                        required: {
                          value: true,
                          message:
                            "Parece que você esqueceu de fornecer o nome da empresa. Por favor, preencha esse campo.",
                        },
                      }),
                    }}
                  />

                  <InputTextMultiline
                    name={"companyDescription"}
                    label={"Descrição"}
                    type={"text"}
                    id={"companyDescription"}
                    inputProps={{
                      ...register("companyDescription"),
                    }}
                  />

                  <InputText
                    name={"companyPhone"}
                    label={"Telefone"}
                    type={"text"}
                    id={"companyPhone"}
                    inputProps={{
                      ...register("companyPhone"),
                    }}
                  />

                  <InputText
                    name={"companyEmail"}
                    label={"Email de Contato"}
                    type={"email"}
                    id={"companyEmail"}
                    error={errors.companyEmail}
                    helperText={
                      errors.companyEmail && errors.companyEmail.message
                    }
                    inputProps={{
                      ...register("companyEmail", {
                        required: {
                          value: true,
                          message:
                            "Insira um e-mail válido para possibilitar que outras pessoas entrem em contato.",
                        },
                      }),
                    }}
                  />

                  <InputText
                    name={"companyWebsite"}
                    label={"Website"}
                    type={"url"}
                    id={"companyWebsite"}
                    inputProps={{
                      ...register("companyWebsite"),
                    }}
                  />

                  <InputText
                    name={"companyCep"}
                    label={"CEP"}
                    type={"text"}
                    id={"companyCep"}
                    error={errors.companyCep}
                    helperText={errors.companyCep && errors.companyCep.message}
                    inputProps={{
                      ...register("companyCep", {
                        required: {
                          value: true,
                          message:
                            "Parece que o campo de CEP está vazio ou contém informações inválidas. Insira um CEP válido.",
                        },
                      }),
                    }}
                  />

                  {/* Considere criar um componente separado para este trecho de código. */}
                  <FormControl
                    fullWidth
                    variant="standard"
                    sx={{
                      marginTop: "15px",
                      marginBottom: "15px",
                      minWidth: 120,
                    }}
                    error={!!errors.companyCondition}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Condição da Empresa
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={selectedCondition}
                      label="Condição da Empresa"
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      inputProps={{
                        ...register("companyCondition", {
                          required: {
                            value: true,
                            message:
                              "Indique se a empresa está no ar ou fora do ar.",
                          },
                        }),
                      }}
                    >
                      {allConditionsList.map((condition) => (
                        <MenuItem value={condition.id} key={condition.id}>
                          {condition.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors.companyCondition?.message}
                    </FormHelperText>
                  </FormControl>
                </DialogContent>

                <DialogActions sx={{ mb: 3, mr: 2 }}>
                  <ButtonCancel onClick={() => setIsCreated(false)} />
                  {isCreating ? (
                    <ButtonConfirm props={<CircularProgressButtonStyled />} />
                  ) : (
                    <ButtonConfirm
                      type={"submit"}
                      props={"Adicionar à Lista"}
                    />
                  )}
                </DialogActions>
              </form>
            </Dialog>

            <ToastContainer />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
