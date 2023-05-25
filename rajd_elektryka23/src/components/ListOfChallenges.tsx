import React from "react";
import { Table } from "react-bootstrap";
import { Challenge } from "../config/types";

interface ListOfChallengesProps {
    challenges: Challenge[];
}

const ListOfChallenges: React.FC<ListOfChallengesProps> = ({ challenges }) => {
    return (
        <div className="container mb-5 pb-1">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Challenge</th>
                        <th>Punkty</th>
                    </tr>
                </thead>
                <tbody>
                    {challenges.map((challenge, index) => (
                        <tr
                            key={index}
                            className={
                                index % 2 === 0
                                    ? "table-light"
                                    : "table-secondary"
                            }
                        >
                            <td>{challenge.description}</td>
                            <td>{challenge.points}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListOfChallenges;
