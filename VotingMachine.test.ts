import { assertEquals } from "jsr:@std/assert";
import { VotingMachine } from "./VotingMachine.ts";
import {
  race1Candidates,
  race2Candidates,
  race4Candidates,
} from "./test_candidates.ts";

const machine = new VotingMachine();
machine.addRace("Race 1", race1Candidates);
machine.addRace("Race 2", race2Candidates);
machine.addRace("Race 3", []);
machine.addRace("Race 4", race4Candidates);

Deno.test(function testGetCandidates() {
  assertEquals(machine.getCandidatesByRaceName("Race 1"), race1Candidates);
});

Deno.test(function testWinner() {
  assertEquals(machine.getWinnerByRaceName("Race 1"), {
    winner: race1Candidates[0].name,
    votes: race1Candidates[0].votes,
  });
});

Deno.test(function testTie() {
  assertEquals(machine.getWinnerByRaceName("Race 2"), {
    winner: "tie",
    votes: 213,
  });
});

Deno.test(function testNoCandidates() {
  assertEquals(
    machine.getWinnerByRaceName("Race 3"),
    {
      winner: "none",
      votes: 0,
    },
  );
});

Deno.test(function testNoVotes() {
  assertEquals(
    machine.getWinnerByRaceName("Race 4"),
    {
      winner: "none",
      votes: 0,
    },
  );
});
