import type { Winner } from "./types.ts";
import type { Candidate, Races } from "./types.ts";

export const RACE_NAME = "Presidential Election";

export class VotingMachine {
  private races: Races = {};

  addRace(raceName: string, candidates: Candidate[]) {
    this.races[raceName] = candidates;
  }

  getCandidatesByRaceName(raceName: string): Candidate[] {
    return this.races[raceName] ?? [];
  }

  getWinnerByRaceName(raceName: string): Winner {
    const candidates = this.races[raceName];
    let tie = false;

    /**
     * Reduce the array to find a winner.
     * A winner is defined as a candidate who:
     *  - Has more votes than all other candidates; or
     *  - Is tied with another candidate, and came first in the array; or
     *  - Is the first candidate in the array, if all candidates have no votes
     */
    const winner = candidates?.reduce((winningCandidate, currentCandidate) => {
      // Skip the first candidate, as it is the initial value
      if (winningCandidate === currentCandidate) return winningCandidate;

      // This represents a tie case, so set the tie case and
      // return the candidate who came first in the array (winningCandidate)
      if (currentCandidate.votes === winningCandidate.votes) {
        tie = true;
        return winningCandidate;
      }

      // There is a new winner. Unset the tie flag and return
      // the new winner
      if (currentCandidate.votes > winningCandidate.votes) {
        tie = false;
        return currentCandidate;
      }

      // If all above tests pass, then the current candidate
      // Has less votes than the winning, so return the
      // winning candidate
      return winningCandidate;
    }, candidates[0]);

    // If there are no candidates, or if there are no votes
    if (candidates.length === 0 || winner.votes === 0) {
      return {
        winner: "none",
        votes: 0,
      };
    }

    if (tie) {
      return {
        winner: "tie",
        votes: winner.votes,
      };
    }

    // Base case: a straightforward one-person victory
    return {
      winner: winner.name,
      votes: winner.votes,
    };
  }
}
