// N#{A09184C5-F724-4E87-AD93-5A80DBD4EABA}|4|#{7E18D0AD-E78E-47A0-8E96-1C0A581902E2}|5|#{B7CC6C77-D43E-4356-B48C-2704B41159BE}|5||
// == f_q_convert('Oil (unspecified)';Mass;'CML2001 - Apr. 2013, Eutrophication Potential (EP)')

start
  = token

token
  = token_CONST
  / token_VAR
  / token_COMPLEX

token_CONST
  = " " value:number MATH_CHAR_TOKENSEPARATOR { return '<span class="token_CONST">' + value  + '</span>'; }

token_VAR
  = "!" variable:identifier MATH_CHAR_TOKENSEPARATOR { return '<span class="token_VAR">' + variable + '</span>'; }

token_COMPLEX
  = Addition
  / Substraction
  / Multiplication
  / Division
  / Power
  / Parantheses
  / CompareGT
  / CompareLT
  / CompareEQ
  / CompareNEQ
  / CompareGTEQ
  / CompareLTEQ
  / FuncFQCONVERT
  / FuncIF
  / FuncSIN
  / FuncCOS
  / FuncTAN
  / FuncSINH
  / FuncCOSH
  / FuncTANH
  / FuncCOTAN
  / FuncExp
  / FuncUnknown1
  / FuncUnknown2
  / FuncUnknown3

Addition
  = "@" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "+" + second; }

Substraction
  = "A" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "-" + second; }

Multiplication
  = "B" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "*" + second; }

Division
  = "C" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "/" + second; }

Power
  = "D" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "^" + second; }

Parantheses
  = "E" first:token MATH_CHAR_TOKENSEPARATOR { return "(" + first + ")"; }

CompareGT
  = "H" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + ">" + second; }

CompareLT
  = "I" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "<" + second; }

CompareEQ
  = "J" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "=" + second; }

CompareNEQ
  = "K" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "<>" + second; }

CompareGTEQ
  = "L" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + ">=" + second; }

CompareLTEQ
  = "M" first:token second:token MATH_CHAR_TOKENSEPARATOR { return first + "<=" + second; }

// N#{A09184C5-F724-4E87-AD93-5A80DBD4EABA}|4|#{7E18D0AD-E78E-47A0-8E96-1C0A581902E2}|5|#{B7CC6C77-D43E-4356-B48C-2704B41159BE}|5||
// == f_q_convert('Oil (unspecified)';Mass;'CML2001 - Apr. 2013, Eutrophication Potential (EP)')
FuncFQCONVERT "FuncFQCONVERT"
  = "N" flow:Hash_UUID_Type_T q1:Hash_UUID_Type_T q2:Hash_UUID_Type_T MATH_CHAR_TOKENSEPARATOR { return "f_q_convert('" + flow + "';'" + q1 + "';'" + q2 + "')"; }

Hash_UUID_Type_T "Hash_UUID_Type_T"
  = "#" uuid:UUID_T "|" Type_T "|" { return uuid2name(uuid); }

UUID_T "UUID_T"
  = start:"{" mid:[A-z0-9\-]+ end:"}" { return start + mid.join("") + end; }

Type_T "Type_T"
  = regex:[0-9]+ { return ""; }

FuncIF
  = "O" condition:BoolExpression TrueCase:token FalseCase: token MATH_CHAR_TOKENSEPARATOR { return "if(" + condition + ";" + TrueCase + ";" + FalseCase + ")"; }

FuncSIN "FuncSIN"
  = "P" argument:token MATH_CHAR_TOKENSEPARATOR { return "sin(" + argument + ")"; }

FuncCOS "FuncCOS"
  = "Q" argument:token MATH_CHAR_TOKENSEPARATOR { return "cos(" + argument + ")"; }

FuncTAN "FuncTAN"
  = "R" argument:token MATH_CHAR_TOKENSEPARATOR { return "tan(" + argument + ")"; }

FuncSINH "FuncSINH"
  = "S" argument:token MATH_CHAR_TOKENSEPARATOR { return "sinh(" + argument + ")"; }

FuncCOSH "FuncCOSH"
  = "T" argument:token MATH_CHAR_TOKENSEPARATOR { return "cosh(" + argument + ")"; }

FuncTANH "FuncTANH"
  = "U" argument:token MATH_CHAR_TOKENSEPARATOR { return "tanh(" + argument + ")"; }

FuncCOTAN "FuncCOTAN"
  = "V" argument:token MATH_CHAR_TOKENSEPARATOR { return "cot(" + argument + ")"; }

FuncExp "FuncExp"
  = "b" argument:token MATH_CHAR_TOKENSEPARATOR { return "exp(" + argument + ")"; }

FuncUnknown1 "FuncUnknown1"
  = id:. arg1:token MATH_CHAR_TOKENSEPARATOR { return "?" + id + "?(" + arg1 + ")"; }

FuncUnknown2 "FuncUnknown2"
  = id:. arg1:token arg2:token MATH_CHAR_TOKENSEPARATOR { return "?" + id + "?(" + arg1 + ", " + arg2 + ")"; }

FuncUnknown3 "FuncUnknown3"
  = id:. arg1:token arg2:token arg3:token MATH_CHAR_TOKENSEPARATOR { return "?" + id + "?(" + arg1 + ", " + arg2 + ", " + arg3 + ")"; }

BoolExpression
  = CompareEQ
  / CompareNEQ
  / CompareLT
  / CompareGT
  / CompareLTEQ
  / CompareGTEQ

MATH_CHAR_TOKENSEPARATOR
  = "|"

number "number"
  = pre:digits "," post:digits { return pre + "." + post; }
  / pre:digits "." post:digits { return pre + "." + post; }
  / nbrs:digits { return nbrs; }

digits "digits"
  = digits:[0-9]+ { return digits.join(""); }

identifier "identifier"
  = chars:[A-z0-9_]+ { return chars.join(""); }