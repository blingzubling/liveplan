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
                peg$c3 = "!",
                peg$c4 = {
                    type: "literal",
                    value: "!",
                    description: "\"!\""
                },
                peg$c5 = function(variable) {
                    return variable;
                },
                peg$c6 = "@",
                peg$c7 = {
                    type: "literal",
                    value: "@",
                    description: "\"@\""
                },
                peg$c8 = function(first, second) {
                    return first + "+" + second;
                },
                peg$c9 = "A",
                peg$c10 = {
                    type: "literal",
                    value: "A",
                    description: "\"A\""
                },
                peg$c11 = function(first, second) {
                    return first + "-" + second;
                },
                peg$c12 = "B",
                peg$c13 = {
                    type: "literal",
                    value: "B",
                    description: "\"B\""
                },
                peg$c14 = function(first, second) {
                    return first + "*" + second;
                },
                peg$c15 = "C",
                peg$c16 = {
                    type: "literal",
                    value: "C",
                    description: "\"C\""
                },
                peg$c17 = function(first, second) {
                    return first + "/" + second;
                },
                peg$c18 = "D",
                peg$c19 = {
                    type: "literal",
                    value: "D",
                    description: "\"D\""
                },
                peg$c20 = function(first, second) {
                    return first + "^" + second;
                },
                peg$c21 = "E",
                peg$c22 = {
                    type: "literal",
                    value: "E",
                    description: "\"E\""
                },
                peg$c23 = function(first) {
                    return "(" + first + ")";
                },
                peg$c24 = "H",
                peg$c25 = {
                    type: "literal",
                    value: "H",
                    description: "\"H\""
                },
                peg$c26 = function(first, second) {
                    return first + ">" + second;
                },
                peg$c27 = "I",
                peg$c28 = {
                    type: "literal",
                    value: "I",
                    description: "\"I\""
                },
                peg$c29 = function(first, second) {
                    return first + "<" + second;
                },
                peg$c30 = "J",
                peg$c31 = {
                    type: "literal",
                    value: "J",
                    description: "\"J\""
                },
                peg$c32 = function(first, second) {
                    return first + "=" + second;
                },
                peg$c33 = "K",
                peg$c34 = {
                    type: "literal",
                    value: "K",
                    description: "\"K\""
                },
                peg$c35 = function(first, second) {
                    return first + "<>" + second;
                },
                peg$c36 = "L",
                peg$c37 = {
                    type: "literal",
                    value: "L",
                    description: "\"L\""
                },
                peg$c38 = function(first, second) {
                    return first + ">=" + second;
                },
                peg$c39 = "M",
                peg$c40 = {
                    type: "literal",
                    value: "M",
                    description: "\"M\""
                },
                peg$c41 = function(first, second) {
                    return first + "<=" + second;
                },
                peg$c42 = {
                    type: "other",
                    description: "FuncFQCONVERT"
                },
                peg$c43 = "N",
                peg$c44 = {
                    type: "literal",
                    value: "N",
                    description: "\"N\""
                },
                peg$c45 = function(flow, q1, q2) {
                    return "f_q_convert('" + flow + "';'" + q1 + "';'" + q2 + "')";
                },
                peg$c46 = {
                    type: "other",
                    description: "Hash_UUID_Type_T"
                },
                peg$c47 = "#",
                peg$c48 = {
                    type: "literal",
                    value: "#",
                    description: "\"#\""
                },
                peg$c49 = "|",
                peg$c50 = {
                    type: "literal",
                    value: "|",
                    description: "\"|\""
                },
                peg$c51 = function(uuid) {
                    return uuid2name(uuid);
                },
                peg$c52 = {
                    type: "other",
                    description: "UUID_T"
                },
                peg$c53 = "{",
                peg$c54 = {
                    type: "literal",
                    value: "{",
                    description: "\"{\""
                },
                peg$c55 = /^[A-z0-9\-]/,
                peg$c56 = {
                    type: "class",
                    value: "[A-z0-9\\-]",
                    description: "[A-z0-9\\-]"
                },
                peg$c57 = "}",
                peg$c58 = {
                    type: "literal",
                    value: "}",
                    description: "\"}\""
                },
                peg$c59 = function(start, mid, end) {
                    return start + mid.join("") + end;
                },
                peg$c60 = {
                    type: "other",
                    description: "Type_T"
                },
                peg$c61 = /^[0-9]/,
                peg$c62 = {
                    type: "class",
                    value: "[0-9]",
                    description: "[0-9]"
                },
                peg$c63 = function(regex) {
                    return "";
                },
                peg$c64 = "O",
                peg$c65 = {
                    type: "literal",
                    value: "O",
                    description: "\"O\""
                },
                peg$c66 = function(condition, TrueCase, FalseCase) {
                    return "if(" + condition + ";" + TrueCase + ";" + FalseCase + ")";
                },
                peg$c67 = {
                    type: "other",
                    description: "FuncSIN"
                },
                peg$c68 = "P",
                peg$c69 = {
                    type: "literal",
                    value: "P",
                    description: "\"P\""
                },
                peg$c70 = function(argument) {
                    return "sin(" + argument + ")";
                },
                peg$c71 = {
                    type: "other",
                    description: "FuncCOS"
                },
                peg$c72 = "Q",
                peg$c73 = {
                    type: "literal",
                    value: "Q",
                    description: "\"Q\""
                },
                peg$c74 = function(argument) {
                    return "cos(" + argument + ")";
                },
                peg$c75 = {
                    type: "other",
                    description: "FuncTAN"
                },
                peg$c76 = "R",
                peg$c77 = {
                    type: "literal",
                    value: "R",
                    description: "\"R\""
                },
                peg$c78 = function(argument) {
                    return "tan(" + argument + ")";
                },
                peg$c79 = {
                    type: "other",
                    description: "FuncSINH"
                },
                peg$c80 = "S",
                peg$c81 = {
                    type: "literal",
                    value: "S",
                    description: "\"S\""
                },
                peg$c82 = function(argument) {
                    return "sinh(" + argument + ")";
                },
                peg$c83 = {
                    type: "other",
                    description: "FuncCOSH"
                },
                peg$c84 = "T",
                peg$c85 = {
                    type: "literal",
                    value: "T",
                    description: "\"T\""
                },
                peg$c86 = function(argument) {
                    return "cosh(" + argument + ")";
                },
                peg$c87 = {
                    type: "other",
                    description: "FuncTANH"
                },
                peg$c88 = "U",
                peg$c89 = {
                    type: "literal",
                    value: "U",
                    description: "\"U\""
                },
                peg$c90 = function(argument) {
                    return "tanh(" + argument + ")";
                },
                peg$c91 = {
                    type: "other",
                    description: "FuncCOTAN"
                },
                peg$c92 = "V",
                peg$c93 = {
                    type: "literal",
                    value: "V",
                    description: "\"V\""
                },
                peg$c94 = function(argument) {
                    return "cot(" + argument + ")";
                },
                peg$c95 = {
                    type: "other",
                    description: "FuncExp"
                },
                peg$c96 = "b",
                peg$c97 = {
                    type: "literal",
                    value: "b",
                    description: "\"b\""
                },
                peg$c98 = function(argument) {
                    return "exp(" + argument + ")";
                },
                peg$c99 = {
                    type: "other",
                    description: "FuncUnknown1"
                },
                peg$c100 = {
                    type: "any",
                    description: "any character"
                },
                peg$c101 = function(id, arg1) {
                    return "?" + id + "?(" + arg1 + ")";
                },
                peg$c102 = {
                    type: "other",
                    description: "FuncUnknown2"
                },
                peg$c103 = function(id, arg1, arg2) {
                    return "?" + id + "?(" + arg1 + ", " + arg2 + ")";
                },
                peg$c104 = {
                    type: "other",
                    description: "FuncUnknown3"
                },
                peg$c105 = function(id, arg1, arg2, arg3) {
                    return "?" + id + "?(" + arg1 + ", " + arg2 + ", " + arg3 + ")";
                },
                peg$c106 = {
                    type: "other",
                    description: "number"
                },
                peg$c107 = ",",
                peg$c108 = {
                    type: "literal",
                    value: ",",
                    description: "\",\""
                },
                peg$c109 = function(pre, post) {
                    return pre + "." + post;
                },
                peg$c110 = ".",
                peg$c111 = {
                    type: "literal",
                    value: ".",
                    description: "\".\""
                },
                peg$c112 = function(nbrs) {
                    return nbrs;
                },
                peg$c113 = {
                    type: "other",
                    description: "digits"
                },
                peg$c114 = function(digits) {
                    return digits.join("");
                },
                peg$c115 = {
                    type: "other",
                    description: "identifier"
                },
                peg$c116 = /^[A-z0-9_]/,
                peg$c117 = {
                    type: "class",
                    value: "[A-z0-9_]",
                    description: "[A-z0-9_]"
                },
                peg$c118 = function(chars) {
                    return chars.join("");
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
                    s0 = peg$parsetoken_VAR();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parsetoken_COMPLEX();
                    }
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

            function peg$parsetoken_VAR() {
                var s0, s1, s2, s3;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 33) {
                    s1 = peg$c3;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c4);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseidentifier();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c5(s2);
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
                                                                                                if (s0 === peg$FAILED) {
                                                                                                    s0 = peg$parseFuncExp();
                                                                                                    if (s0 === peg$FAILED) {
                                                                                                        s0 = peg$parseFuncUnknown1();
                                                                                                        if (s0 === peg$FAILED) {
                                                                                                            s0 = peg$parseFuncUnknown2();
                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                s0 = peg$parseFuncUnknown3();
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

            function peg$parseSubstraction() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 65) {
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

            function peg$parseMultiplication() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 66) {
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

            function peg$parseDivision() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 67) {
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

            function peg$parsePower() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 68) {
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
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c20(s2, s3);
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
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c23(s2);
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

            function peg$parseCompareLT() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 73) {
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

            function peg$parseCompareEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 74) {
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

            function peg$parseCompareNEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 75) {
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

            function peg$parseCompareGTEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 76) {
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

            function peg$parseCompareLTEQ() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 77) {
                    s1 = peg$c39;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c40);
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
                                s1 = peg$c41(s2, s3);
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
                    s1 = peg$c43;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c44);
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
                                    s1 = peg$c45(s2, s3, s4);
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
                        peg$fail(peg$c42);
                    }
                }

                return s0;
            }

            function peg$parseHash_UUID_Type_T() {
                var s0, s1, s2, s3, s4, s5;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 35) {
                    s1 = peg$c47;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c48);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseUUID_T();
                    if (s2 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 124) {
                            s3 = peg$c49;
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c50);
                            }
                        }
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseType_T();
                            if (s4 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 124) {
                                    s5 = peg$c49;
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c50);
                                    }
                                }
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c51(s2);
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
                        peg$fail(peg$c46);
                    }
                }

                return s0;
            }

            function peg$parseUUID_T() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 123) {
                    s1 = peg$c53;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c54);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = [];
                    if (peg$c55.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c56);
                        }
                    }
                    if (s3 !== peg$FAILED) {
                        while (s3 !== peg$FAILED) {
                            s2.push(s3);
                            if (peg$c55.test(input.charAt(peg$currPos))) {
                                s3 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c56);
                                }
                            }
                        }
                    } else {
                        s2 = peg$FAILED;
                    }
                    if (s2 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                            s3 = peg$c57;
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c58);
                            }
                        }
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c59(s1, s2, s3);
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
                        peg$fail(peg$c52);
                    }
                }

                return s0;
            }

            function peg$parseType_T() {
                var s0, s1, s2;

                peg$silentFails++;
                s0 = peg$currPos;
                s1 = [];
                if (peg$c61.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c62);
                    }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c61.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c62);
                            }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c63(s1);
                }
                s0 = s1;
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c60);
                    }
                }

                return s0;
            }

            function peg$parseFuncIF() {
                var s0, s1, s2, s3, s4, s5;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 79) {
                    s1 = peg$c64;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c65);
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
                                    s1 = peg$c66(s2, s3, s4);
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
                    s1 = peg$c68;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c69);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c70(s2);
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
                        peg$fail(peg$c67);
                    }
                }

                return s0;
            }

            function peg$parseFuncCOS() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 81) {
                    s1 = peg$c72;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c73);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c74(s2);
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
                        peg$fail(peg$c71);
                    }
                }

                return s0;
            }

            function peg$parseFuncTAN() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 82) {
                    s1 = peg$c76;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c77);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c78(s2);
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
                        peg$fail(peg$c75);
                    }
                }

                return s0;
            }

            function peg$parseFuncSINH() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 83) {
                    s1 = peg$c80;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c81);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c82(s2);
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
                        peg$fail(peg$c79);
                    }
                }

                return s0;
            }

            function peg$parseFuncCOSH() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 84) {
                    s1 = peg$c84;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c85);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c86(s2);
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
                        peg$fail(peg$c83);
                    }
                }

                return s0;
            }

            function peg$parseFuncTANH() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 85) {
                    s1 = peg$c88;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c89);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c90(s2);
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
                        peg$fail(peg$c87);
                    }
                }

                return s0;
            }

            function peg$parseFuncCOTAN() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 86) {
                    s1 = peg$c92;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c93);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c94(s2);
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
                        peg$fail(peg$c91);
                    }
                }

                return s0;
            }

            function peg$parseFuncExp() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 98) {
                    s1 = peg$c96;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c97);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c98(s2);
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
                        peg$fail(peg$c95);
                    }
                }

                return s0;
            }

            function peg$parseFuncUnknown1() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.length > peg$currPos) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c100);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c101(s1, s2);
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
                        peg$fail(peg$c99);
                    }
                }

                return s0;
            }

            function peg$parseFuncUnknown2() {
                var s0, s1, s2, s3, s4;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.length > peg$currPos) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c100);
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
                                s1 = peg$c103(s1, s2, s3);
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
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c102);
                    }
                }

                return s0;
            }

            function peg$parseFuncUnknown3() {
                var s0, s1, s2, s3, s4, s5;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.length > peg$currPos) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c100);
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parsetoken();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsetoken();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parsetoken();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parseMATH_CHAR_TOKENSEPARATOR();
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c105(s1, s2, s3, s4);
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
                        peg$fail(peg$c104);
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
                    s0 = peg$c49;
                    peg$currPos++;
                } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c50);
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
                        s2 = peg$c107;
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c108);
                        }
                    }
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parsedigits();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c109(s1, s3);
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
                            s2 = peg$c110;
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c111);
                            }
                        }
                        if (s2 !== peg$FAILED) {
                            s3 = peg$parsedigits();
                            if (s3 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c109(s1, s3);
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
                            s1 = peg$c112(s1);
                        }
                        s0 = s1;
                    }
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c106);
                    }
                }

                return s0;
            }

            function peg$parsedigits() {
                var s0, s1, s2;

                peg$silentFails++;
                s0 = peg$currPos;
                s1 = [];
                if (peg$c61.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c62);
                    }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c61.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c62);
                            }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c114(s1);
                }
                s0 = s1;
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c113);
                    }
                }

                return s0;
            }

            function peg$parseidentifier() {
                var s0, s1, s2;

                peg$silentFails++;
                s0 = peg$currPos;
                s1 = [];
                if (peg$c116.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c117);
                    }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c116.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c117);
                            }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c118(s1);
                }
                s0 = s1;
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c115);
                    }
                }

                return s0;
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


    var uuid2name = function(uuid) {
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
    };

    angular.module('myApp.math.nice', [])

    .service('niceParserService', function() {

        var parse = function(input) {
            if (input === '') {
                return '';
            }

            var result = '(parse error)';
            try {
                result = internalParser.parse(input);
            } catch (err) {
                result = result;
            }
            return result;
        };

        return {
            parse: parse,
            uuid2name: uuid2name
        };
    });
})();