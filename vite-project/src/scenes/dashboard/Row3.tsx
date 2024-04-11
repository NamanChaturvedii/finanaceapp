import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/flexBetween";
import {
    useGetKpisQuery,
    useGetProductsQuery,
    useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[500]];

    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();

    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {
                            name: key,
                            value: value,
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value,
                        },
                    ];
                }
            );
        }
    }, [kpiData]);

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ];

    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.67,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.35,
            renderCell: (params: GridCellParams) =>
                (params.value as Array<string>).length,
        },
    ];

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    sideText={`${productData?.length} products`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${transactionData?.length} latest transactions`}
                />
                <Box
                    mt="1rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionData || []}
                        columns={transactionColumns}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="i">
                <BoxHeader title="Expense Breakdown By Category" sideText="This Year" />
                <FlexBetween mt="0.0rem" gap="0.5rem" p="0 1rem" textAlign="center">
                    {pieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`} >
                            <PieChart width={110} height={75}>
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography color="lightcyan" fontSize="12.5px">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="j">
                <BoxHeader
                    title="Overall Summary and  Data"
                    sideText=""
                />
                <Box
                    height="16px"
                    margin="0.5rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[600]}
                        borderRadius="1rem"
                        width="40%"
                    ></Box>
                </Box>
                <Typography margin="0 1rem" color="lightgreen" fontSize="11px">
                    This app helps to get the Expenses,Profits and Revenue for the user.
                    It is working on self developed APIs.<br/>
                    <b>Made By Naman Chaturvedi.</b>
                </Typography>
            </DashboardBox>
        </>
    );
};

export default Row3;