import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery } from "@/state/api"
import { useMemo } from "react";
import { useTheme } from "@mui/material";
// import { Tooltip } from "@mui/material";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, CartesianGrid, Legend, LineChart, Bar ,BarChart} from 'recharts';
import BoxHeader from "@/components/BoxHeader";
// import { FlashAuto } from "@mui/icons-material";


const Row1 = () => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();
    console.log("data:", data);
    const revenueExpenses = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses
                }
            })
        )
    }, [data])
    const revenueProfit = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    profit: (revenue - expenses).toFixed(2)
                }
            })
        )
    }, [data])

    const revenue = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue}) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                }
            })
        )
    }, [data])
    return (
        <>
            <DashboardBox gridArea="a">
                <BoxHeader title="Revenue & Expenses"
                    subtitle="Top line represents revenue, bottom line represents expenses"
                    sideText="This Year" />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpenses}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 70,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[700]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.secondary[300]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "11px",fill:"wheat" }}  />
                        <YAxis tickLine={false} style={{ fontSize: "11px",fill:"wheat" }} axisLine={{ strokeWidth: "0" }} domain={[8000, 23000]}  />
                        <Tooltip />
                        <Area type="monotone" dot={true} dataKey="revenue" fillOpacity={1} stroke={palette.primary[600]
                        } fill="url(#colorRevenue)" />

                        <Area type="monotone" dot={true} dataKey="expenses" fillOpacity={1} stroke={palette.secondary[600]
                        } fill="url(#colorExpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="b">
                <BoxHeader
                    title="Profit and Revenue"
                    subtitle="Top line represents expenses, bottom line represents profit"
                    sideText="This Year"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={400}
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 70,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            style={{ fontSize: "10px",fill:"Window" }}
                        />
                        <YAxis
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" ,fill:"Window"}}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px",fill:"Window" }}
                        />
                        <Tooltip />
                        <Legend
                            height={20}
                            wrapperStyle={{
                                margin: "0 0 8px 0",
                            }}
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="profit"
                            stroke={palette.tertiary[500]}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="revenue"
                            stroke={palette.secondary[600]}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="c">
                <BoxHeader
                    title="Revenue Month by Month"
                    subtitle="Graph representing the revenue month by month"
                    sideText="This Year"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={revenue}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 65,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px",fill:"wheat" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px",fill:"wheat" }}
                        />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row1;