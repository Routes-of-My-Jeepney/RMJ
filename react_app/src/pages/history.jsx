import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import {} from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
import DeleteIcon from "@mui/icons-material/Delete";

function History() {
    const [rows, setRows] = useState([]);
    const url = "http://localhost:8000/api/";

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

    async function getHistory() {
        try {
            let historyRes = await axios.get(url + "history", {
                paramas: {
                    user_id: 1,
                },
            });

            console.log(historyRes);

            const historyData = historyRes.data;

            const handleSortModelChange = (model) => {
                console.log(model);
                const sortedRows = sortData(rows, model);
                setRows(sortedRows);
            };

            let data = [];

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
            console.log("===============");
            console.log("成功しました！！！");
            console.log("===============");
        } catch (e) {
            console.log(e);
            console.log("エラーが起きました！");
        }
    }

    // 一部のHistoryのデータを削除するリクエストを投げる関数を作る

    const [selectedRows, setSelectedRows] = useState([]);

    const refreshPage = () => {
        window.location.reload();
    };

    const handleRowSelect = (newSelection) => {
        setSelectedRows(newSelection.selectionModel);
    };

    // useEffect(() => {
    //     const selectedIds = selectedRows.map((row) => row.id);
    //     console.log(selectedIds);
    // }, [selectedRows]);

    const deleteSelectedRows = async () => {
        for (const id of selectedRows) {
            try {
                const response = await axios.delete(url + "history", {
                    params: { id: id },
                });
                console.log(response.data);
            } catch (error) {
                console.error("エラーが出力されました。");
            }
        }
        refreshPage();
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

            <DeleteIcon
                color="primary"
                style={{ fontSize: 30, marginLeft: 11 }}
                onClick={deleteSelectedRows}
            />

            <div style={{ height: 700, width: "100%" }}>
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
