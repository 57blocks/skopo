# 2026-10-15 · A lock, declared differences, and semantic findings as warnings

| | |
|---|---|
| Touches | R-43tfsd, R-vcvkc2, T-z7h51s, R-k728ve |
| Sources | draft 0.3 of the working model; an experiment that planted changes in a worked example and measured what the lock and a language model caught |
| Grade | evidenced |
| Recorded | reconstructed 2026-10-21 |

Two swapped anchors in the worked example went unnoticed, "the accident that started this design":
a lock holding each statement's accepted text, against which every difference has to be declared as
a change of meaning, a rewording or a removal. In the scenario tests the textual checks met every
mechanical expectation, and a language model found 6 of 6 planted changes of meaning while flagging
0 of 23 equivalent pairs. On a real edit the model's two findings were one true defect that its
author had thought harmless and one correct note of an intended change, so its findings stay
warnings that a person accepts.
