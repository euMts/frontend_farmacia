import React, { useEffect, useState } from "react";
import {
  DashboardContainer,
  DashboardWrapper,
  ItemsContainer,
  UnderInfoContainer,
  FirstLineContainer,
  ThirdLineContainer,
} from "./dashboardPageElements";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CardsWidget from "./CardsWidgetElements";
import History from "./HistoryElements";
import MainSales from "./MainSalesElements";
import { BsCart4 } from "react-icons/bs";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Icon } from "@iconify/react";
import api from "../../connection/api";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const firstSearchApi = async () => {
    try {
      const response = await api.get("/find/dashboard");
      if (response.status === 422) {
        // alert("Usuário ou senha incorretos")
      } else {
        setDashboardData(response.data);
        console.log(dashboardData)
      }
      setIsLoading(false)
    } catch (error) {
      alert("Erro inesperado");
      setDashboardData(null);
    }
  };

  useEffect(() => {
    firstSearchApi();
  }, []);

  // useEffect(() => {
  //   setDashboardData({
  //     historyData: [
  //       {
  //         id: "0",
  //         title: "20 Registros",
  //         time: "2023-05-18 02:29",
  //       },
  //       {
  //         id: "1",
  //         title: "12 Registros",
  //         time: "2023-05-18 02:19",
  //       },
  //       {
  //         id: "2",
  //         title: "10 Registros",
  //         time: "2023-05-18 01:29",
  //       },
  //       {
  //         id: "3",
  //         title: "120 Registros",
  //         time: "2023-05-18 00:29",
  //       },
  //     ],
  //     mainSalesData: [
  //       { label: "NomeProduto1", value: 400 },
  //       { label: "NomeProduto2", value: 430 },
  //       { label: "NomeProduto3", value: 448 },
  //       { label: "NomeProduto4", value: 470 },
  //       { label: "NomeProduto5", value: 540 },
  //       { label: "NomeProduto6", value: 580 },
  //       { label: "NomeProduto7", value: 690 },
  //       { label: "NomeProduto8", value: 1100 },
  //       { label: "NomeProduto9", value: 1200 },
  //       { label: "NomeProduto10", value: 1380 },
  //     ],
  //   });
  //   // setIsLoading(false);
  // }, []);

  return (
    <>
      <DashboardContainer>
        <DashboardWrapper style={{ padding: "35px" }}>
          <ItemsContainer>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} md={3}>
                <CardsWidget
                  pagePath="..//vendasestoque"
                  title1="Vendas"
                  title2="Visualizar e adicionar informações específicas no sistema"
                  color="#04297A"
                  bgcolor="#D0F2FF"
                  icon={<BsCart4 style={{ fontSize: "25px" }} />}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <CardsWidget
                  pagePath="..//panorama"
                  title1="Panorama"
                  title2="Identificar o produto mais vendido em determinada época"
                  color="#04297A"
                  bgcolor="#D0F2FF"
                  icon={
                    <Icon
                      style={{ fontSize: "25px" }}
                      icon="ic:baseline-perm-data-setting"
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <CardsWidget
                  pagePath="..//historico"
                  title1="Histórico"
                  title2="Buscar pela data a qual foram adicionadas informações no sistema"
                  color="#04297A"
                  bgcolor="#D0F2FF"
                  icon={
                    <Icon
                      style={{ fontSize: "25px" }}
                      icon="ic:baseline-history"
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardsWidget
                  pagePath="..//predicao"
                  title1="Predição"
                  title2="Analisar dados para obter uma estimativa de vendas futuras"
                  color="#08660D"
                  bgcolor="#E9FCD4"
                  icon={
                    <Icon
                      style={{ fontSize: "25px" }}
                      icon="fluent:predictions-20-filled"
                    />
                  }
                />
              </Grid>
            </Grid>
          </ItemsContainer>
          <UnderInfoContainer>
            <FirstLineContainer style={{ marginBottom: "35px" }}>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "40px",
                    marginLeft: "500px",
                    marginBottom: "150px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <MainSales
                    style={{ width: "760px" }}
                    title="Principais vendas"
                    subheader="Produtos mais vendidos de todos os tempos"
                    chartData={dashboardData.mainSalesData}
                  />

                  <History
                    style={{
                      width: "300px",
                      // height: "90%",
                    }}
                    title="Resumo histórico"
                    subheader={"Movimentações de vendas"}
                    list={dashboardData.historyData}
                  />
                </>
              )}
            </FirstLineContainer>

            <ThirdLineContainer>
              <Button
                variant="text"
                startIcon={
                  <KeyboardArrowUpIcon style={{ color: "rgba(0,0,0,0.6)" }} />
                }
                style={{ color: "rgba(0,0,0,0.6)" }}
                onClick={handleScrollToTop}
              >
                Voltar ao topo
              </Button>
              <Typography style={{ color: "rgba(0,0,0,0.6)" }}>
                Versão 2023 (Build 0.0.1)
              </Typography>
            </ThirdLineContainer>
          </UnderInfoContainer>
        </DashboardWrapper>
      </DashboardContainer>
    </>
  );
  // );
};

export default DashboardPage;
