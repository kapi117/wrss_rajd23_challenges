import React from "react";
import { Team } from "../config/types";

interface RankingProps {
    teams: Team[];
}

const Ranking: React.FC<RankingProps> = ({ teams }) => {
    const sortedTeams = teams.sort((a, b) => b.points - a.points);

    return (
        <div>
            <div>
                <h2>Ranking ojca</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Pozycja</th>
                            <th>Nazwa zespołu</th>
                            <th>Ilość punktów</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={team.name}>
                                <td>{index + 1}</td>
                                <td>{team.name}</td>
                                <td>{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ranking;
