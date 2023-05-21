import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddTeamPage() {
    const [teamName, setTeamName] = useState<string>("");
    const [members, setMembers] = useState<string[]>([]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Logic to handle form submission, such as sending data to backend or performing validations
        // You can access the teamName and members state variables here
        console.log("Team Name:", teamName);
        console.log("Members:", members);
    };

    return (
        <div className="container">
            <h1>Add Team</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="teamName">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="members">
                    <Form.Label>Members</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter team members (separated by commas)"
                        value={members}
                        onChange={(e) =>
                            setMembers([...members, e.target.value])
                        }
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Team
                </Button>
            </Form>
        </div>
    );
}

export default AddTeamPage;
