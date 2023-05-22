import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Challenge, Team } from "../config/types";
import { useNavigate } from "react-router-dom";
import { updateTeamInFirestore } from "../App";

interface AddTeamPageProps {
    teams: Team[];
}

const AddTeamPage: React.FC<AddTeamPageProps> = ({ teams }) => {
    const [teamName, setTeamName] = useState("");
    const [members, setMembers] = useState([""]);
    const navigate = useNavigate();

    const handleChangeMember = (index: number, value: string) => {
        const updatedMembers = [...members];
        updatedMembers[index] = value;
        setMembers(updatedMembers);
    };

    const handleAddMember = () => {
        setMembers([...members, ""]);
    };

    const handleRemoveMember = (index: number) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (
            teamName === "" ||
            members.length === 0 ||
            members.indexOf("") !== -1
        ) {
            alert("Nazwa zespołu oraz członkowie nie mogą być puste!");
            return;
        }
        if (teams.find((team) => team.name === teamName) !== undefined) {
            alert("Zespół o takiej nazwie już istnieje!");
            return;
        }
        const newTeam: Team = {
            name: teamName,
            points: 0,
            completedChallengesIds: [],
            completedChallengesPoints: [],
            extraPoints: [],
            members: members,
            extraDescriptions: [],
        };

        updateTeamInFirestore(newTeam);
        setTeamName("");
        setMembers([""]);
        console.log(newTeam);
        navigate("/admin/teams");
    };

    return (
        <div className="container">
            <h1 className="m-3">Dodaj zespół</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="teamName">
                    <Form.Label>Nazwa zespołu</Form.Label>
                    <Form.Control
                        className="mx-2"
                        type="text"
                        placeholder="Podaj nazwę zespołu"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="d-flex flex-column" controlId="members">
                    <Form.Label className="mt-3">Członkowie zespołu</Form.Label>
                    {members.map((member, index) => (
                        <div key={index} className="d-flex">
                            <Form.Control
                                className="m-2"
                                type="text"
                                placeholder={`Dodaj członka nr ${index + 1}`}
                                value={member}
                                onChange={(e) =>
                                    handleChangeMember(index, e.target.value)
                                }
                            />
                            <Button
                                variant="danger"
                                className="my-2"
                                onClick={() => handleRemoveMember(index)}
                            >
                                Usuń
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="success"
                        className="my-3"
                        onClick={handleAddMember}
                    >
                        Dodaj członka
                    </Button>

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Zapisz zespół
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default AddTeamPage;
