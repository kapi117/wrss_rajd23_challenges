type Challenge = {
    description: string;
    points: number;
};

type Team = {
    name: string;
    points: number;
    members: string[];
    completedChallengesIds: string[];
};

export type { Challenge };
