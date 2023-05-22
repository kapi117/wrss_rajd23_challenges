import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Challenge, Team } from "../config/types";
import { updateTeamInFirestore } from "../App";
import { useNavigate } from "react-router-dom";

interface MarkTaskCompletedProps {
    challenges: Challenge[];
    teams: Team[];
}

const MarkTaskCompleted: React.FC<MarkTaskCompletedProps> = ({
    challenges,
    teams,
}) => {
    const [challengeName, setChallengeName] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [points, setPoints] = useState<number>(0);

    const navigate = useNavigate();

    const handleChallengeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChallengeName(e.target.value);
        const selectedChallenge = challenges.find(
            (challenge) => challenge.description === e.target.value
        );
        if (selectedChallenge) {
            setPoints(selectedChallenge.points);
        } else {
            console.log("Invalid challenge selection");
            setPoints(0);
        }
    };

    const handleTeamChange = (e: any) => {
        setSelectedTeam(e.target.value);
    };

    const handlePointsChange = (e: any) => {
        setPoints(parseInt(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Find the selected challenge
        const selectedChallenge = challenges.find(
            (challenge) => challenge.description === challengeName
        );

        const selectedTeamObj = teams.find(
            (team) => team.name === selectedTeam
        );

        if (!selectedTeamObj) {
            alert("Invalid challenge or team selection");
            return;
        }

        if (selectedChallenge) {
            selectedTeamObj.completedChallengesIds.push(selectedChallenge.id);
            selectedTeamObj.completedChallengesPoints.push(points);
        } else {
            selectedTeamObj.extraPoints.push(points);
            selectedTeamObj.extraDescriptions.push(challengeName);
        }

        selectedTeamObj.points += points;

        updateTeamInFirestore(selectedTeamObj);

        // Clear the form
        setChallengeName("");
        setSelectedTeam("");
        setPoints(0);

        navigate("/admin/challenges");
    };

    return (
        <div className="container">
            <h1 className="m-3">Mark Task Completed</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="challengeName">
                    <Form.Label>Challenge Name</Form.Label>
                    <Form.Control
                        list="datalistOptions"
                        placeholder="Enter challenge name"
                        value={challengeName}
                        onChange={handleChallengeChange}
                    />
                    <datalist id="datalistOptions">
                        {challenges.map((challenge) => (
                            <option
                                key={challenge.id}
                                value={challenge.description}
                            >
                                {challenge.description}
                            </option>
                        ))}
                    </datalist>
                </Form.Group>

                <Form.Group controlId="team">
                    <Form.Label>Team</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedTeam}
                        onChange={handleTeamChange}
                    >
                        <option value="">Select team</option>
                        {teams.map((team) => (
                            <option key={team.name} value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="points">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Points"
                        value={points}
                        onChange={handlePointsChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Mark Completed
                </Button>
            </Form>
        </div>
    );
};

export default MarkTaskCompleted;
