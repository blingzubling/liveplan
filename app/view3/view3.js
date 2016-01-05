/*global angular*/
/*global _*/
/*global Snap*/

'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/view3', {
            redirectTo: '/plan/{D57CCB0C-9E31-44BD-9A3C-F729891B56DF}'
        })
        .when('/plan/:guid', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
}])

.factory('gabiObject', ['$resource', function($resource) {
    return $resource('data/:guid.json', {
        guid: '@uuid'
    });
}])

.controller('View3Ctrl', ['$scope', '$http', '$routeParams', '$q', 'gabiObject', function($scope, $http, $routeParams, $q, gabiObject) {

    var first = function() {
        var s = Snap('#blackboard'); // This will use an existing svg element (not a div)

        s.circle(200, 200, 10);
        var r = s.rect(200, 100, 100, 100, 20, 20).attr({
            stroke: '#123456',
            'strokeWidth': 20,
            fill: 'red',
            'opacity': 0.3
        });

        var rclone = r.clone();
        var rclone2 = r.clone();
        var rclone3 = r.clone();
        var rclone4 = r.clone();
        var rclone5 = r.clone();

        //t=relative transform, T=absolute transform, s=relative scale, S=absolute Scale
        //r=relative rotate, R=relative rotate
        //relative means it takes into account previous transforms to accumulate
        //here it doesn't make much difference, until we combine later


        rclone.transform('t100,100');
        rclone2.transform('r20,200,200');
        rclone3.transform('r40,200,200');

        s.text(350, 150, 'rotate around 200,200');

        rclone4.transform('t100,100r20,200,200');
        rclone5.transform('t100,100r40,200,200');

        s.text(450, 250, 'combined translate of 100,100 and rotate around 200,200');
    };
    first();

    var second = function() {
        var s = Snap('#svgout');
        // var mapSvg = 
        Snap.load('data/map.svg', function(loadedFragment) {
            s.append(loadedFragment);
        });
    };
    second();

    var decimalToRGB = function(decimal) {
        var R = decimal % 256;
        var G = (decimal >> 8) % 256;
        var B = (decimal >> 16) % 256;
        return 'rgb(' + R + ',' + G + ',' + B + ')';
    };

    var wrap = function(str, attrs, maxLineWidth) {

        var myAttrs = _.omit(attrs, 'opacity');
        myAttrs.opacity = 0.0;

        var s = Snap('#owPlan');

        var fromTo = function(start, end, pitch) {
            var res = '';
            if (end < pitch.length) {
                for (var i = start; i <= end; i++) {
                    res = (res === '') ? pitch[i] : res + ' ' + pitch[i];
                }
            }
            return res;
        };

        var getExtends = function(aLine, aAttrs) {
            var p = s.text(0, 0, aLine).attr(aAttrs);
            var bbox = _.omit(p.getBBox());
            p.remove();
            return bbox;
        };

        var cutAtLinebreaks = str.split(/\n/g);
        var resultLines = [];
        var resultHeight = 0;
        for (var lnr = 0; lnr < cutAtLinebreaks.length; lnr++) {

            var pitch = cutAtLinebreaks[lnr].split(' ');
            var idx = 0,
                upTo = 0;
            var myLine = '';

            while (upTo < pitch.length) {
                myLine = fromTo(idx, upTo, pitch);
                var bbox = getExtends(myLine, myAttrs);
                resultHeight = Math.max(resultHeight, bbox.height);
                if (bbox.width < maxLineWidth) {
                    upTo++;
                } else if (idx === upTo) {
                    myLine = fromTo(idx, upTo, pitch);
                    idx++;
                    upTo++;
                    resultLines.push(myLine);
                } else {
                    myLine = fromTo(idx, upTo - 1, pitch);
                    idx = upTo;
                    resultLines.push(myLine);
                }
            }
            // resultLines.push(myLine + '-XXX');
            resultLines.push(myLine + '');
        }

        var result = {
            lines: resultLines,
            lineHeight: resultHeight
        };
        return result;
    };

    var STANDARD_TEXT_ATTRS = {
        'font-size': '8pt',
        'font-weight': 'normal'
    };

    var applyStandardFont = function(textelem, x, lineHeight) {
        textelem.attr(STANDARD_TEXT_ATTRS)
            .selectAll('tspan').forEach(function(tspan, i) {
                if (i > 0) {
                    tspan.attr({
                        x: x,
                        dy: lineHeight
                    });
                }
            });
    };

    var paintCommentInst = function(ciJson) {
        var s = Snap('#owPlan');

        // var ci = 
        s.rect(
            ciJson['left'],
            ciJson['top'],
            ciJson['width'],
            ciJson['height']).attr({
                stroke: 'rgb(0,0,0)',
                'stroke-width': '0.5',
                'fill': decimalToRGB(ciJson['color']),
                'fill-opacity': 1.0
            });
        var wrapText = wrap(ciJson['comment'], STANDARD_TEXT_ATTRS, ciJson['width'] - 6);
        var cmt = s.text(ciJson['left'] + 3, ciJson['top'] + 15, wrapText.lines);
        applyStandardFont(cmt, ciJson['left'] + 3, wrapText.lineHeight);
    };

    var painterFnTemplate = function(x, y, objectType, maxLineWidth) {
        return function(name, guid) {
            var s = Snap('#owPlan');
            var lnk = s.el('a').attr({
                'xlink:href': '#/' + objectType + '/' + guid
            });
            var wrapText = wrap(name, STANDARD_TEXT_ATTRS, maxLineWidth);
            var textelem = s.text(x + 5, y + 15, wrapText.lines);
            applyStandardFont(textelem, x + 5, wrapText.lineHeight);
            lnk.append(textelem);
        };
    };

    var resolveAndPaintProcessInst = function(piJson, painterFn) {
        var guid = {
            guid: piJson['process-ref']
        };

        // var myProcess = 
        gabiObject.get(guid).$promise.then(
            function(responseOK) {
                var nation = (responseOK['nation'] === '' || _.isUndefined(responseOK['nation'])) ? '' : responseOK['nation'] + ': ';
                painterFn(nation + responseOK['name'], piJson['process-ref']);
            },
            function(responseFail) {
                painterFn('?');
                console.warn(responseFail);
            }
        );
    };

    var paintProcessInst = function(piJson) {
        var s = Snap('#owPlan');
        var strokeWidth = 0.75468;
        s.rect(
            piJson['left'] + strokeWidth,
            piJson['top'] + strokeWidth,
            piJson['width'] - strokeWidth,
            piJson['height'] - strokeWidth
        ).attr({
            stroke: '#e1e1e1',
            'stroke-width': strokeWidth,
            fill: 'url(#linearGradient4156)'
        });

        var objectType = (piJson['plan'] === true) ? 'plan' : 'process';
        var newFn = painterFnTemplate(piJson['left'], piJson['top'], objectType, piJson['width'] - 50);
        resolveAndPaintProcessInst(piJson, newFn);
    };

    var calcVector = function(ptStart, ptEnd) {
        return {
            dirX: ptEnd.posX - ptStart.posX,
            dirY: ptEnd.posY - ptStart.posY,
            isLeftToRight: function() {
                return (this.dirX > 0 && this.dirY === 0);
            },
            isRightToLeft: function() {
                return (this.dirX < 0 && this.dirY === 0);
            },
            isTopToBottom: function() {
                return (this.dirX === 0 && this.dirY > 0);
            },
            isBottomToTop: function() {
                return (this.dirX === 0 && this.dirY < 0);
            }
        };
    };

    var paintArrowAt = function(x, y, color) {
        // paints horizontal arrow pointing from left to right
        var s = Snap('#owPlan');
        var arrowPath = 'M' + x + ' ' + y + ' l' + '-5 -5 l0 10 z';
        var arrow = s.path(arrowPath).attr({
            fill: decimalToRGB(color),
            stroke: decimalToRGB(color)
        });
        return arrow;
    };

    var paintStretch = function(pointFrom, pointTo, color) {
        var s = Snap('#owPlan');
        var pfad = [];
        pfad.push(pointFrom.posX);
        pfad.push(pointFrom.posY);
        pfad.push(pointTo.posX);
        pfad.push(pointTo.posY);

        // paint flow instance stretch
        var stretch = s.polyline(pfad).attr({
            fill: 'none',
            stroke: decimalToRGB(color),
            'stroke-width': '3'
        });
        var result;

        // paint arrow at sink of stretch
        if (pointTo.pointType === 1) {
            var arrowDirection = calcVector(pointFrom, pointTo);

            var arrow = paintArrowAt(pointTo.posX, pointTo.posY, color);

            var adon = ',' + pointTo.posX + ',' + pointTo.posY;
            if (arrowDirection.isLeftToRight()) {
                arrow.transform('r0' + adon);
            } else if (arrowDirection.isRightToLeft()) {
                arrow.transform('r180' + adon);
            } else if (arrowDirection.isTopToBottom()) {
                arrow.transform('r90' + adon);
            } else if (arrowDirection.isBottomToTop()) {
                arrow.transform('r270' + adon);
            }
            result = s.g(stretch, arrow);
        } else {
            result = stretch;
        }
        return result;
    };

    var paintStretchFromPointsFn = function(s, points, color) {
        return function(stretchesItem) {
            var pointsFrom = _.filter(points, function(point) {
                return (point.pointId === stretchesItem.startPointId);
            });
            var pointsTo = _.filter(points, function(point) {
                return (point.pointId === stretchesItem.endPointId);
            });
            
            return paintStretch(pointsFrom[0], pointsTo[0], color);
        };
    };

    var paintFlowInst = function(fiJson) {
        var s = Snap('#owPlan');

        var stretchesPainter = paintStretchFromPointsFn(s, fiJson['points'], fiJson['color']);
        var paintedStretches = $q.all( _.map(fiJson['streches'], stretchesPainter ));
        return paintedStretches;
    };

    var fetchAndPaintVisibleQuantity = function(planJson, painterFn) {
        var guid = {
            guid: planJson['visibleQuantity-ref']
        };
        // var visQnt = 
        gabiObject.get(guid).$promise.then(
            function(resonseOK) {
                painterFn(resonseOK['name']);
            },
            function(responseFail) {
                painterFn('? (' + guid.guid + ' not found)');
                console.warn(responseFail);
            }
        );
    };

    var promisePaintFlowInstFn = function(planJson) {
        return function() {
            return $q.all(_.map(planJson['flowInstances'], paintFlowInst));
        };
    };

    var promisePaintProcessInstFn = function(planJson) {
        return function() {
            return $q.all(_.map(planJson['processInstances'], paintProcessInst));
        };
    };

    var promisePaintCommentInstFn = function(planJson) {
        return function() {
            return $q.all(_.map(planJson['commentInstances'], paintCommentInst));
        };
    };

    var michelangelo = function(planJson) {
        var s = Snap('#owPlan');

        window.document.title = '[Plan] ' + planJson['name'];
        // var strPlanName = 
        s.text(15, 20, planJson['name']).attr({
            'font-size': '16pt',
            'font-style': 'normal',
            'font-weight': 'normal',
            'text-anchor': 'start',
            'fill': '#000000',
            'font-family': 'Segoe UI'
        });
        /*
        _.map( planJson['flowInstances'], paintFlowInst );
        _.map( planJson['processInstances'], paintProcessInst );
        _.map( planJson['commentInstances'], paintCommentInst );
        */

        var promisePaintFlowInst = promisePaintFlowInstFn(planJson);
        var promisePaintProcessInst = promisePaintProcessInstFn(planJson);
        var promisePaintCommentInst = promisePaintCommentInstFn(planJson);

        promisePaintFlowInst()
            .then(promisePaintProcessInst)
            .then(promisePaintCommentInst);

        var paintVisibleQuantity = painterFnTemplate(15, 20, 'quantity', 9999999);
        fetchAndPaintVisibleQuantity(planJson, paintVisibleQuantity);
    };

    var autsch = function(failData) {
        var s = Snap('#owPlan');
        var txt = failData.status + ' ' + failData.statusText;
        s.text(30, 52, txt).attr({
            'font-size': '48pt',
            'fill': 'rgb(200,200,200)'
        });
    };

    var fetch = function($scope) {

        var rp = $routeParams;

        var guid = {
            guid: rp.guid
        };

        gabiObject.get(guid).$promise.then(
            function(responseOK) {
                $scope.aPlan = responseOK;
                michelangelo($scope.aPlan);
            },
            function(responseFail) {
                $scope.failData = responseFail;
                autsch(responseFail);
            }
        );
    };
    fetch($scope);
}]);