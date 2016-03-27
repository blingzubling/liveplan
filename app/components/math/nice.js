(function() {
    var internalParser = (function() {
        "use strict";

        function peg$subclass(child, parent) {
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
        }

        function peg$SyntaxError(message, expected, found, location) {
            this.message = message;
            this.expected = expected;
            this.found = found;
            this.location = location;
            this.name = "SyntaxError";

            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(this, peg$SyntaxError);
            }
        }

        peg$subclass(peg$SyntaxError, Error);

        function peg$parse(input) {
            var options = arguments.length > 1 ? arguments[1] : {},
                parser = this,

                peg$FAILED = {},

                peg$startRuleFunctions = {
                    start: peg$parsestart
                },
                peg$startRuleFunction = peg$parsestart,

                peg$c0 = " ",
                peg$c1 = {
                    type: "literal",
                    value: " ",
                    description: "\" \""
                },
                peg$c2 = function(value) {
                    return value;
                },
                peg$c3 = "@",
                peg$c4 = {
                    type: "literal",
                    value: "@",
                    description: "\"@\""
                },
                peg$c5 = function(first, second) {
                    return first + "+" + second;
                },
                peg$c6 = "A",
                peg$c7 = {
                    type: "literal",
                    value: "A",
                    description: "\"A\""
                },
                peg$c8 = function(first, second) {
                    return first + "-" + second;
                },
                peg$c9 = "B",
                peg$c10 = {
                    type: "literal",
                    value: "B",
                    description: "\"B\""
                },
                peg$c11 = function(first, second) {
                    return first + "*" + second;
                },
                peg$c12 = "C",
                peg$c13 = {
                    type: "literal",
                    value: "C",
                    description: "\"C\""
                },
                peg$c14 = function(first, second) {
                    return first + "/" + second;
                },
                peg$c15 = "D",
                peg$c16 = {
                    type: "literal",
                    value: "D",
                    description: "\"D\""
                },
                peg$c17 = function(first, second) {
                    return first + "^" + second;
                },
                peg$c18 = "E",
                peg$c19 = {
                    type: "literal",
                    value: "E",
                    description: "\"E\""
                },
                peg$c20 = function(first) {
                    return "(" + first + ")";
                },
                peg$c21 = "H",
                peg$c22 = {
                    type: "literal",
                    value: "H",
                    description: "\"H\""
                },
                peg$c23 = function(first, second) {
                    return first + ">" + second;
                },
                peg$c24 = "I",
                peg$c25 = {
                    type: "literal",
                    value: "I",
                    description: "\"I\""
                },
                peg$c26 = function(first, second) {
                    return first + "<" + second;
                },
                peg$c27 = "J",
                peg$c28 = {
                    type: "literal",
                    value: "J",
                    description: "\"J\""
                },
                peg$c29 = function(first, second) {
                    return first + "=" + second;
                },
                peg$c30 = "K",
                peg$c31 = {
                    type: "literal",
                    value: "K",
                    description: "\"K\""
                },
                peg$c32 = function(first, second) {
                    return first + "<>" + second;
                },
                peg$c33 = "L",
                peg$c34 = {
                    type: "literal",
                    value: "L",
                    description: "\"L\""
                },
                peg$c35 = function(first, second) {
                    return first + ">=" + second;
                },
                peg$c36 = "M",
                peg$c37 = {
                    type: "literal",
                    value: "M",
                    description: "\"M\""
                },
                peg$c38 = function(first, second) {
                    return first + "<=" + second;
                },
                peg$c39 = {
                    type: "other",
                    description: "FuncFQCONVERT"
                },
                peg$c40 = "N",
                peg$c41 = {
                    type: "literal",
                    value: "N",
                    description: "\"N\""
                },
                peg$c42 = function(flow, q1, q2) {
                    return "f_q_convert('" + flow + "';'" + q1 + "';'" + q2 + "')";
                },
                peg$c43 = {
                    type: "other",
                    description: "Hash_UUID_Type_T"
                },
                peg$c44 = "#",
                peg$c45 = {
                    type: "literal",
                    value: "#",
                    description: "\"#\""
                },
                peg$c46 = "|",
                peg$c47 = {
                    type: "literal",
                    value: "|",
                    description: "\"|\""
                },
                peg$c48 = function(uuid) {
                    return uuid2name(uuid);
                },
                peg$c49 = {
                    type: "other",
                    description: "UUID_T"
                },
                peg$c50 = "{",
                peg$c51 = {
                    type: "literal",
                    value: "{",
                    description: "\"{\""
                },
                peg$c52 = /^[A-z0-9\-]/,
                peg$c53 = {
                    type: "class",
                    value: "[A-z0-9\\-]",
                    description: "[A-z0-9\\-]"
                },
                peg$c54 = "}",
                peg$c55 = {
                    type: "literal",
                    value: "}",
                    description: "\"}\""
                },
                peg$c56 = function(start, mid, end) {
                    return start + mid.join("") + end;
                },
                peg$c57 = {
                    type: "other",
                    description: "Type_T"
                },
                peg$c58 = /^[0-9]/,
                peg$c59 = {
                    type: "class",
                    value: "[0-9]",
                    description: "[0-9]"
                },
                peg$c60 = function(regex) {
                    return "";
                },
                peg$c61 = "O",
                peg$c62 = {
                    type: "literal",
                    value: "O",
                    description: "\"O\""
                },
                peg$c63 = function(condition, TrueCase, FalseCase) {
                    return "if(" + condition + ";" + TrueCase + ";" + FalseCase + ")";
                },
                peg$c64 = {
                    type: "other",
                    description: "FuncSIN"
                },
                peg$c65 = "P",
                peg$c66 = {
                    type: "literal",
                    value: "P",
                    description: "\"P\""
                },
                peg$c67 = function(argument) {
                    return "sin(" + argument + ")";
                },
                peg$c68 = {
                    type: "other",
                    description: "FuncCOS"
                },
                peg$c69 = "Q",
                peg$c70 = {
                    type: "literal",
                    value: "Q",
                    description: "\"Q\""
                },
                peg$c71 = function(argument) {
                    return "cos(" + argument + ")";
                },
                peg$c72 = {
                    type: "other",
                    description: "FuncTAN"
                },
                peg$c73 = "R",
                peg$c74 = {
                    type: "literal",
                    value: "R",
                    description: "\"R\""
                },
                peg$c75 = function(argument) {
                    return "tan(" + argument + ")";
                },
                peg$c76 = {
                    type: "other",
                    description: "FuncSINH"
                },
                peg$c77 = "S",
                peg$c78 = {
                    type: "literal",
                    value: "S",
                    description: "\"S\""
                },
                peg$c79 = function(argument) {
                    return "sinh(" + argument + ")";
                },
                peg$c80 = {
                    type: "other",
                    description: "FuncCOSH"
                },
                peg$c81 = "T",
                peg$c82 = {
                    type: "literal",
                    value: "T",
                    description: "\"T\""
                },
                peg$c83 = function(argument) {
                    return "cosh(" + argument + ")";
                },
                peg$c84 = {
                    type: "other",
                    description: "FuncTANH"
                },
                peg$c85 = "U",
                peg$c86 = {
                    type: "literal",
                    value: "U",
                    description: "\"U\""
                },
                peg$c87 = function(argument) {
                    return "tanh(" + argument + ")";
                },
                peg$c88 = {
                    type: "other",
                    description: "FuncCOTAN"
                },
                peg$c89 = "V",
                peg$c90 = {
                    type: "literal",
                    value: "V",
                    description: "\"V\""
                },
                peg$c91 = function(argument) {
                    return "cot(" + argument + ")";
                },
                peg$c92 = {
                    type: "other",
                    description: "number"
                },
                peg$c93 = ",",
                peg$c94 = {
                    type: "literal",
                    value: ",",
                    description: "\",\""
                },
                peg$c95 = function(pre, post) {
                    return pre + "." + post;
                },
                peg$c96 = ".",
                peg$c97 = {
                    type: "literal",
                    value: ".",
                    description: "\".\""
                },
                peg$c98 = function(nbrs) {
                    return nbrs;
                },
                peg$c99 = {
                    type: "other",
                    description: "digits"
                },
                peg$c100 = function(digits) {
                    return digits.join("");
                },

                peg$currPos = 0,
                peg$savedPos = 0,
                peg$posDetailsCache = [{
                    line: 1,
                    column: 1,
                    seenCR: false
                }],
                peg$maxFailPos = 0,
                peg$maxFailExpected = [],
                peg$silentFails = 0,

                peg$result;

            if ("startRule" in options) {
                if (!(options.startRule in peg$startRuleFunctions)) {
                    throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
                }

                peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
            }

            function text() {
                return input.substring(peg$savedPos, peg$currPos);
            }

            function location() {
                return peg$computeLocation(peg$savedPos, peg$currPos);
            }

            function expected(description) {
                throw peg$buildException(
                    null, [{
                        type: "other",
                        description: description
                    }],
                    input.substring(peg$savedPos, peg$currPos),
                    peg$computeLocation(peg$savedPos, peg$currPos)
                );
            }

            function error(message) {
                throw peg$buildException(
                    message,
                    null,
                    input.substring(peg$savedPos, peg$currPos),
                    peg$computeLocation(peg$savedPos, peg$currPos)
                );
            }

            function peg$computePosDetails(pos) {
                var details = peg$posDetailsCache[pos],
                    p, ch;

                if (details) {
                    return details;
                } else {
                    p = pos - 1;
                    while (!peg$posDetailsCache[p]) {
                        p--;
                    }

                    details = peg$posDetailsCache[p];
                    details = {
                        line: details.line,
                        column: details.column,
                        seenCR: details.seenCR
                    };

                    while (p < pos) {
                        ch = input.charAt(p);
                        if (ch === "\n") {
                            if (!details.seenCR) {
                                details.line++;
                            }
                            details.column = 1;
                            details.seenCR = false;
                        } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                            details.line++;
                            details.column = 1;
                            details.seenCR = true;
                        } else {
                            details.column++;
                            details.seenCR = false;
                        }

                        p++;
                    }

                    peg$posDetailsCache[pos] = details;
                    return details;
                }
            }

            function peg$computeLocation(startPos, endPos) {
                var startPosDetails = peg$computePosDetails(startPos),
                    endPosDetails = peg$computePosDetails(endPos);

                return {
                    start: {
                        offset: startPos,
                        line: startPosDetails.line,
                        column: startPosDetails.column
                    },
                    end: {
                        offset: endPos,
                        line: endPosDetails.line,
                        column: endPosDetails.column
                    }
                };
            }

            function peg$fail(expected) {
                if (peg$currPos < peg$maxFailPos) {
                    return;
                }

                if (peg$currPos > peg$maxFailPos) {
                    peg$maxFailPos = peg$currPos;
                    peg$maxFailExpected = [];
                }

                peg$maxFailExpected.push(expected);
            }

            function peg$buildException(message, expected, found, location) {
                function cleanupExpected(expected) {
                    var i = 1;

                    expected.sort(function(a, b) {
                        if (a.description < b.description) {
                            return -1;
                        } else if (a.description > b.description) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    while (i < expected.length) {
                        if (expected[i - 1] === expected[i]) {
                            expected.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }

                function buildMessage(expected, found) {
                    function stringEscape(s) {
                        function hex(ch) {
                            return ch.charCodeAt(0).toString(16).toUpperCase();
                        }

                        return s
                            .replace(/\\/g, '\\\\')
                            .replace(/"/g, '\\"')
                            .replace(/\x08/g, '\\b')
                            .replace(/\t/g, '\\t')
                            .replace(/\n/g, '\\n')
                            .replace(/\f/g, '\\f')
                            .replace(/\r/g, '\\r')
                            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) {
                                return '\\x0' + hex(ch);
                            })
                            .replace(/[\x10-\x1F\x80-\xFF]/g, function(ch) {
                                return '\\x' + hex(ch);
                            })
                            .replace(/[\u0100-\u0FFF]/g, function(ch) {
                                return '\\u0' + hex(ch);
                            })
                            .replace(/[\u1000-\uFFFF]/g, function(ch) {
                                return '\\u' + hex(ch);
                            });
                    }

                    var expectedDescs = new Array(expected.length),
                        expectedDesc, foundDesc, i;

                    for (i = 0; i < expected.length; i++) {
                        expectedDescs[i] = expected[i].description;
                    }

                    expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

                    foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

                    return "Expected " + expectedDesc + " but " + foundDesc + " found.";
                }

                if (expected !== null) {
                    cleanupExpected(expected);
                }

                return new peg$SyntaxError(
                    message !== null ? message : buildMessage(expected, found),
                    expected,
                    found,
                    location
                );
            }

            function peg$parsestart() {
                var s0;

                s0 = peg$parsetoken();

                return s0;
            }

            function peg$parsetoken() {
                var s0;

                s0 = peg$parsetoken_CONST();
                if (s0 === peg$FAILED) {
                    s0 = peg$parsetoken_COMPLEX();
                }

                return s0;
            }

            function peg$parsetoken_CONST() {
                var s0, s1, s2, s3;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 32) {
                    s1 = peg$c0;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c1);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsenumber();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c2(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parsetoken_COMPLEX() {
                var s0;

                s0 = peg$parseAddition();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseSubstraction();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseMultiplication();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseDivision();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parsePower();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseParantheses();
                                    if (s0 === peg$FAILED) {
                                        s0 = peg$parseCompareGT();
                                        if (s0 === peg$FAILED) {
                                            s0 = peg$parseCompareLT();
                                            if (s0 === peg$FAILED) {
                                                s0 = peg$parseCompareEQ();
                                                if (s0 === peg$FAILED) {
                                                    s0 = peg$parseCompareNEQ();
                                                    if (s0 === peg$FAILED) {
                                                        s0 = peg$parseCompareGTEQ();
                                                        if (s0 === peg$FAILED) {
                                                            s0 = peg$parseCompareLTEQ();
                                                            if (s0 === peg$FAILED) {
                                                                s0 = peg$parseFuncFQCONVERT();
                                                                if (s0 === peg$FAILED) {
                                                                    s0 = peg$parseFuncIF();
                                                                    if (s0 === peg$FAILED) {
                                                                        s0 = peg$parseFuncSIN();
                                                                        if (s0 === peg$FAILED) {
                                                                            s0 = peg$parseFuncCOS();
                                                                            if (s0 === peg$FAILED) {
                                                                                s0 = peg$parseFuncTAN();
                                                                                if (s0 === peg$FAILED) {
                                                                                    s0 = peg$parseFuncSINH();
                                                                                    if (s0 === peg$FAILED) {
                                                                                        s0 = peg$parseFuncCOSH();
                                                                                        if (s0 === peg$FAILED) {
                                                                                            s0 = peg$parseFuncTANH();
                                                                                            if (s0 === peg$FAILED) {
                                                                                                s0 = peg$parseFuncCOTAN();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                return s0;
            }

            function peg$parseAddition() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 64) {
                    s1 = peg$c3;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c4);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c5(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseSubstraction() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 65) {
                    s1 = peg$c6;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c8(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseMultiplication() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 66) {
                    s1 = peg$c9;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c11(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseDivision() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 67) {
                    s1 = peg$c12;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c13);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c14(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parsePower() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 68) {
                    s1 = peg$c15;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c16);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c17(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseParantheses() {
                var s0, s1, s2, s3;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 69) {
                    s1 = peg$c18;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c19);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c20(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseCompareGT() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 72) {
                    s1 = peg$c21;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c22);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c23(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseCompareLT() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 73) {
                    s1 = peg$c24;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c25);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c26(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseCompareEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 74) {
                    s1 = peg$c27;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c28);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c29(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseCompareNEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 75) {
                    s1 = peg$c30;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c31);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c32(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseCompareGTEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 76) {
                    s1 = peg$c33;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c34);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c35(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseCompareLTEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 77) {
                    s1 = peg$c36;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c37);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c38(s2, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseFuncFQCONVERT() {
                var s0, s1, s2, s3, s4, s5;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 78) {
                    s1 = peg$c40;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c41);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseHash_UUID_Type_T();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseHash_UUID_Type_T();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseHash_UUID_Type_T();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c42(s2, s3, s4);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c39);
                    }
                }

                return s0;
            }

            function peg$parseHash_UUID_Type_T() {
                var s0, s1, s2, s3, s4, s5;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 35) {
                    s1 = peg$c44;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseUUID_T();
                    if (s2 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 124) {
                            s3 = peg$c46;
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c47);
                            }
                        }
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseType_T();
                            if (s4 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 124) {
                                    s5 = peg$c46;
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c47);
                                    }
                                }
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c48(s2);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }

                return s0;
            }

            function peg$parseUUID_T() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 123) {
                    s1 = peg$c50;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c51);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = [];
                    if (peg$c52.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c53);
                        }
                    }
                    if (s3 !== peg$FAILED) {
                        while (s3 !== peg$FAILED) {
                            s2.push(s3);
                            if (peg$c52.test(input.charAt(peg$currPos))) {
                                s3 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c53);
                                }
                            }
                        }
                    } else {
                        s2 = peg$FAILED;
                    }
                    if (s2 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                            s3 = peg$c54;
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c55);
                            }
                        }
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c56(s1, s2, s3);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c49);
                    }
                }

                return s0;
            }

            function peg$parseType_T() {
                var s0, s1, s2;

                peg$silentFails++;
                s0 = peg$currPos;
                s1 = [];
                if (peg$c58.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c59);
                    }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c58.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c59);
                            }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c60(s1);
                }
                s0 = s1;
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c57);
                    }
                }

                return s0;
            }

            function peg$parseFuncIF() {
                var s0, s1, s2, s3, s4, s5;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 79) {
                    s1 = peg$c61;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c62);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseBoolExpression();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parsetoken();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c63(s2, s3, s4);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseFuncSIN() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 80) {
                    s1 = peg$c65;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c66);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c67(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c64);
                    }
                }

                return s0;
            }

            function peg$parseFuncCOS() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 81) {
                    s1 = peg$c69;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c70);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c71(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c68);
                    }
                }

                return s0;
            }

            function peg$parseFuncTAN() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 82) {
                    s1 = peg$c73;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c74);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c75(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c72);
                    }
                }

                return s0;
            }

            function peg$parseFuncSINH() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 83) {
                    s1 = peg$c77;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c78);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c79(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c76);
                    }
                }

                return s0;
            }

            function peg$parseFuncCOSH() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 84) {
                    s1 = peg$c81;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c82);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c83(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c80);
                    }
                }

                return s0;
            }

            function peg$parseFuncTANH() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 85) {
                    s1 = peg$c85;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c86);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c87(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c84);
                    }
                }

                return s0;
            }

            function peg$parseFuncCOTAN() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 86) {
                    s1 = peg$c89;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c90);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c91(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c88);
                    }
                }

                return s0;
            }

            function peg$parseBoolExpression() {
                var s0;

                s0 = peg$parseCompareEQ();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseCompareNEQ();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseCompareLT();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseCompareGT();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseCompareLTEQ();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseCompareGTEQ();
                                }
                            }
                        }
                    }
                }

                return s0;
            }

            function peg$parseMATH_CHAR_TOKENSEPARATOR() {
                var s0;

                if (input.charCodeAt(peg$currPos) === 124) {
                    s0 = peg$c46;
                    peg$currPos++;
                } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c47);
                    }
                }

                return s0;
            }

            function peg$parsenumber() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                s1 = peg$parsedigits();
                if (s1 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                        s2 = peg$c93;
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c94);
                        }
                    }
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsedigits();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c95(s1, s3);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parsedigits();
                    if (s1 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 46) {
                            s2 = peg$c96;
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c97);
                            }
                        }
                        if (s2 !== peg$FAILED) {
                            s3 = peg$parsedigits();
                            if (s3 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c95(s1, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        s1 = peg$parsedigits();
                        if (s1 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c98(s1);
                        }
                        s0 = s1;
                    }
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c92);
                    }
                }

                return s0;
            }

            function peg$parsedigits() {
                var s0, s1, s2;

                peg$silentFails++;
                s0 = peg$currPos;
                s1 = [];
                if (peg$c58.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c59);
                    }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c58.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c59);
                            }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c100(s1);
                }
                s0 = s1;
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c99);
                    }
                }

                return s0;
            }


            function uuid2name(uuid) {
                switch (uuid) {
                    case "{A09184C5-F724-4E87-AD93-5A80DBD4EABA}":
                        return "Oil (unspecified)";
                        break;
                    case "{7E18D0AD-E78E-47A0-8E96-1C0A581902E2}":
                        return "Mass";
                        break;
                    case "{B7CC6C77-D43E-4356-B48C-2704B41159BE}":
                        return "CML2001 - Apr. 2013, Eutrophication Potential (EP)";
                        break;
                    default:
                        return "unknown";
                }
            }


            peg$result = peg$startRuleFunction();

            if (peg$result !== peg$FAILED && peg$currPos === input.length) {
                return peg$result;
            } else {
                if (peg$result !== peg$FAILED && peg$currPos < input.length) {
                    peg$fail({
                        type: "end",
                        description: "end of input"
                    });
                }

                throw peg$buildException(
                    null,
                    peg$maxFailExpected,
                    peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
                    peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
                );
            }
        }

        return {
            SyntaxError: peg$SyntaxError,
            parse: peg$parse
        };
    })();

    angular.module('myApp.math.nice', [])

    .factory('niceParserService', function() {

        var parse = function(input) {
            return internalParser.parse(input);
        };

        return {
            parse: parse
        };
    });
})();