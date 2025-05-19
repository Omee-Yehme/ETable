import React, { useEffect, useState } from "react";
import "./App.css";

export default function Page() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("API error");
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch(() => alert("failed to fetch data"));
    }, []);

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentRows = data.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div>
            <h2>Employee Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={prevPage}><h4>Previous</h4></button>
                <div className="page-box">{currentPage}</div>
                <button onClick={nextPage} disabled={currentPage === totalPages}><h4>Next</h4></button>
            </div>
        </div>
    );
}
