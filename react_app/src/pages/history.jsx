import React, { useState, useEffect } from "react";
import axios from "../axios";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import {} from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
import DeleteIcon from "@mui/icons-material/Delete";
import getCSRFToken from "../utils/getCSRFToken";

function History() {
    const [rows, setRows] = useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 0, sortDirection: "desc" },
        { field: "origin", headerName: "出発地", width: 300 },
        { field: "destination", headerName: "到着地", width: 300 },
        {
            field: "created_at",
            headerName: "時間",
            width: 150,
        },
    ];

    let user = JSON.parse(localStorage.getItem("user"));

    async function getHistory() {
        try {
            getCSRFToken();
            let historyRes = await axios.get("/api/user/history");

            const historyData = historyRes.data;

            const handleSortModelChange = (model) => {
                console.log(model);
                const sortedRows = sortData(rows, model);
                setRows(sortedRows);
            };

            let data = [];
            console.log(data);

            for (let i = 0; i < historyData.length; i++) {
                let id = historyRes.data[i].id;
                let origin = historyRes.data[i].origin;
                let destination = historyRes.data[i].destination;
                let createTime = historyRes.data[i].created_at;

                let row = {
                    id: id,
                    origin: origin,
                    destination: destination,
                    created_at: createTime,
                };
                data.push(row);
            }

            setRows(data);
        } catch (e) {
            console.log(e);
            console.log("エラーが起きました！");
        }
    }

    //削除機能
    const [selectedRows, setSelectedRows] = useState([]);
    const refreshPage = () => {
        window.location.reload();
    };

    const handleRowSelect = (newSelection) => {
        setSelectedRows(newSelection.selectionModel);
    };

    const deleteSelectedRows = async () => {
        for (const id of selectedRows) {
            try {
                const response = await axios.delete("/api/user/history", {
                    params: { id: id },
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        //refreshPage();
    };

    useEffect(() => {
        getHistory();
    }, []);

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />

            <script></script>
            <DeleteIcon
                color="primary"
                style={{ fontSize: 30, marginLeft: 51 }}
                onClick={function disp() {
                    if (window.confirm("本当に履歴を削除しますか？")) {
                        deleteSelectedRows();
                    }
                }}
            />

            <div style={{ height: 700, width: "95%", marginLeft: 40 }}>
                <DataGrid
                    rows={rows}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelectionModel) => {
                        //console.log(newSelectionModel);
                        setSelectedRows(newSelectionModel);
                    }}
                    selectionModel={selectedRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </>
    );
}

export default History;
