type Challenge = {
    description: string;
    points: number;
    id: string;
};

type Team = {
    name: string;
    points: number;
    members: string[];
    completedChallengesIds: string[];
    completedChallengesPoints: number[];
    extraDescriptions: string[];
    extraPoints: number[];
};

export type { Challenge, Team };
