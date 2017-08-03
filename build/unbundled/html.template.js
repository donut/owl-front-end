"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactDOMServer = require("react-dom/server");
const serialize = require("serialize-javascript");
function render(element, state, fetcher) {
    return `
<!DOCTYPE html>
<html lang="en-us">

<head>
	<meta charset="utf-8">
	<title>RTM Owl</title>
	<link rel="stylesheet" type="text/css" href="/main.css">
</head>

<body>
	<div id="root">${ReactDOMServer.renderToString(element)}</div>

	<script>
		window.__PRELOADED_STATE__ = ${serialize(state, { isJSON: true })}
		window.__RELAY_PAYLOADS__ = ${serialize(fetcher, { isJSON: true })}
	</script>
	<script src="/bundle.js"></script>
</body>

</html>
`.trim();
}
exports.default = render;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odG1sLnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbURBQWtEO0FBQ2xELGtEQUFpRDtBQUVqRCxnQkFBK0IsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPO0lBQ3JELE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7a0JBV1UsY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7OztpQ0FHdkIsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztnQ0FDbkMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Ozs7O0NBTW5FLENBQUMsSUFBSSxFQUFFLENBQUE7QUFDUixDQUFDO0FBdkJELHlCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUmVhY3RET01TZXJ2ZXIgZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCAqIGFzIHNlcmlhbGl6ZSBmcm9tICdzZXJpYWxpemUtamF2YXNjcmlwdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKGVsZW1lbnQsIHN0YXRlLCBmZXRjaGVyKTogc3RyaW5nIHtcblx0cmV0dXJuIGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWwgbGFuZz1cImVuLXVzXCI+XG5cbjxoZWFkPlxuXHQ8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cblx0PHRpdGxlPlJUTSBPd2w8L3RpdGxlPlxuXHQ8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9tYWluLmNzc1wiPlxuPC9oZWFkPlxuXG48Ym9keT5cblx0PGRpdiBpZD1cInJvb3RcIj4ke1JlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKGVsZW1lbnQpfTwvZGl2PlxuXG5cdDxzY3JpcHQ+XG5cdFx0d2luZG93Ll9fUFJFTE9BREVEX1NUQVRFX18gPSAke3NlcmlhbGl6ZShzdGF0ZSwgeyBpc0pTT046IHRydWUgfSl9XG5cdFx0d2luZG93Ll9fUkVMQVlfUEFZTE9BRFNfXyA9ICR7c2VyaWFsaXplKGZldGNoZXIsIHsgaXNKU09OOiB0cnVlIH0pfVxuXHQ8L3NjcmlwdD5cblx0PHNjcmlwdCBzcmM9XCIvYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG48L2JvZHk+XG5cbjwvaHRtbD5cbmAudHJpbSgpXG59XG4iXX0=