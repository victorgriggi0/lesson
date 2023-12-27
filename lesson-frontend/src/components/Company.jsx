// Importações de Bibliotecas e Frameworks
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";

// Importações de Componentes
import { MetadataText } from "./MetadataText";
import { HeadingText } from "./HeadingText";
import { SecondaryText } from "./SecondaryText";
import { InputText } from "./InputText";
import { InputTextMultiline } from "../components/InputTextMultiline";
import { SupportingText } from "./SupportingText";
import { ContactText } from "./ContactText";
import { Redirect } from "./Redirect";
import { ButtonEditItem } from "./ButtonEditItem";
import { ButtonDeleteItem } from "./ButtonDeleteItem";
import { ButtonCancel } from "./ButtonCancel";
import { ButtonConfirm } from "./ButtonConfirm";
import { CircularProgressButtonStyled } from "../components/CircularProgressButtonStyled";

// Importações de Serviços
import {
  getUserInformation,
  isSystemCoordinator,
  isPartnershipManager,
} from "../utils/userUtils";
import { getAllConditions } from "../services/conditions";

export function Company(props) {
  // Estados
  const [userInformation, setUserInformation] = useState(null);
  const [allConditionsList, setAllConditionsList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedCompanyName, setUpdatedCompanyName] = useState("");
  const [updatedCompanyDescription, setUpdatedCompanyDescription] =
    useState("");
  const [updatedCompanyPhone, setUpdatedCompanyPhone] = useState("");
  const [updatedCompanyEmail, setUpdatedCompanyEmail] = useState("");
  const [updatedCompanyWebsite, setUpdatedCompanyWebsite] = useState("");
  const [updatedCompanyCep, setUpdatedCompanyCep] = useState("");
  const [updatedCompanyCondition, setUpdatedCompanyCondition] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //
  const openEditModal = () => {
    setIsUpdated(true);
    setUpdatedCompanyName(props.company.name);
    setUpdatedCompanyDescription(props.company.description);
    setUpdatedCompanyPhone(props.company.phone);
    setUpdatedCompanyEmail(props.company.email);
    setUpdatedCompanyWebsite(props.company.website);
    setUpdatedCompanyCep(props.company.cep);
    setUpdatedCompanyCondition(props.company.conditionId);
  };
  // Efeito para atualizar os dados da condição quando houver alterações
  useEffect(() => {
    setUpdatedCompanyName(props.company.name);
    setUpdatedCompanyDescription(props.company.description);
    setUpdatedCompanyPhone(props.company.phone);
    setUpdatedCompanyEmail(props.company.email);
    setUpdatedCompanyWebsite(props.company.website);
    setUpdatedCompanyCep(props.company.cep);
    setUpdatedCompanyCondition(props.company.conditionId);
  }, [
    props.company.name,
    props.company.description,
    props.company.phone,
    props.company.email,
    props.company.website,
    props.company.cep,
    props.company.conditionId,
  ]);

  //
  useEffect(() => {
    async function fetchUserInformation() {
      const result = await getUserInformation();
      setUserInformation(result);
    }
    fetchUserInformation();
  }, []);

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
  async function editCompany(data) {
    try {
      setIsUpdating(true);
      await props.editCompany({
        ...data,
        id: props.company.id,
      });
      setIsUpdated(false);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }

  async function removeCompany(data) {
    try {
      setIsDeleting(true);
      await props.removeCompany({
        ...data,
        id: props.company.id,
      });
      setIsDeleted(false);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 2, p: 1 }}>
        <CardContent>
          <MetadataText props={`ID ${props.company.id}`} />
          <HeadingText props={`${props.company.name}`} />
          <SecondaryText
            props={`${props.company.condition.name} • Em ${props.company.city} - ${props.company.state}`}
          />
          <SupportingText props={`${props.company.description}`} />
          <ContactText
            props={`Esta empresa está localizada no Bairro ${props.company.neighborhood}, na ${props.company.avenue}. Fique à vontade para entrar em contato pelo telefone ${props.company.phone} ou via e-mail em ${props.company.email}`}
          />
          <Redirect href={props.company.website} />
        </CardContent>
        {userInformation &&
          (isSystemCoordinator(userInformation) ||
            isPartnershipManager(userInformation)) && (
            <CardActions sx={{ ml: 1 }}>
              <ButtonEditItem onClick={openEditModal} />
              <ButtonDeleteItem onClick={() => setIsDeleted(true)} />
            </CardActions>
          )}
      </Card>

      {/* Modal de edição */}
      <Dialog open={isUpdated} onClose={() => setIsUpdated(false)} fullWidth>
        <form onSubmit={handleSubmit(editCompany)}>
          <DialogTitle>
            {" "}
            <HeadingText props={"Atualize as Informações da Empresa"} />
          </DialogTitle>

          <DialogContent>
            <InputTextMultiline
              name={"companyName"}
              label={"Nome"}
              type={"text"}
              id={"companyName"}
              value={updatedCompanyName}
              error={errors.companyName}
              helperText={errors.companyName && errors.companyName.message}
              onChange={(e) => setUpdatedCompanyName(e.target.value)}
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
              value={updatedCompanyDescription}
              onChange={(e) => setUpdatedCompanyDescription(e.target.value)}
              inputProps={{
                ...register("companyDescription"),
              }}
            />

            <InputText
              name={"companyPhone"}
              label={"Telefone"}
              type={"text"}
              id={"companyPhone"}
              value={updatedCompanyPhone}
              onChange={(e) => setUpdatedCompanyPhone(e.target.value)}
              inputProps={{
                ...register("companyPhone"),
              }}
            />

            <InputText
              name={"companyEmail"}
              label={"Email de Contato"}
              type={"email"}
              id={"companyEmail"}
              value={updatedCompanyEmail}
              error={errors.companyEmail}
              helperText={errors.companyEmail && errors.companyEmail.message}
              onChange={(e) => setUpdatedCompanyEmail(e.target.value)}
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
              value={updatedCompanyWebsite}
              onChange={(e) => setUpdatedCompanyWebsite(e.target.value)}
              inputProps={{
                ...register("companyWebsite"),
              }}
            />

            <InputText
              name={"companyCep"}
              label={"CEP"}
              type={"text"}
              id={"companyCep"}
              value={updatedCompanyCep}
              error={errors.companyCep}
              helperText={errors.companyCep && errors.companyCep.message}
              onChange={(e) => setUpdatedCompanyCep(e.target.value)}
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
                value={updatedCompanyCondition}
                label="Condição da Empresa"
                onChange={(e) => setUpdatedCompanyCondition(e.target.value)}
                inputProps={{
                  ...register("companyCondition", {
                    required: {
                      value: true,
                      message: "Indique se a empresa está no ar ou fora do ar.",
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
            <ButtonCancel onClick={() => setIsUpdated(false)} />
            {isUpdating ? (
              <ButtonConfirm props={<CircularProgressButtonStyled />} />
            ) : (
              <ButtonConfirm type={"submit"} props={"Atualizar Informações"} />
            )}
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal confirmando a deleção do dado */}
      <Dialog
        open={isDeleted}
        onClose={() => setIsDeleted(false)}
        maxWidth="xs"
        sx={{ textAlign: "center" }}
      >
        <DialogTitle>Você tem certeza?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Você realmente deseja excluir este dado? Esse processo não pode ser
            desfeito.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ mb: 3, justifyContent: "center" }}>
          <ButtonCancel
            onClick={() => setIsDeleted(false)}
            props={"Não, quero cancelar"}
          />

          {isDeleting ? (
            <ButtonConfirm
              color={"error"}
              props={<CircularProgressButtonStyled />}
            />
          ) : (
            <ButtonConfirm
              color={"error"}
              type={"submit"}
              onClick={() => removeCompany()}
              props={"Sim, desejo apagar"}
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
