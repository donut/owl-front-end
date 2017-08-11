"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Link = require('found/lib/Link');
const first = require("lodash/first");
const last = require("lodash/last");
const React = require("react");
const Relay = require('react-relay');
const { createFragmentContainer, graphql } = Relay;
const Video_1 = require("./Video");
require("../../../src/components/VideoList/style.pcss");
var SortField;
(function (SortField) {
    SortField["TheOwl"] = "score";
    SortField["PercentChange"] = "percent";
    SortField["ChangeCount"] = "change";
})(SortField || (SortField = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["Ascending"] = "asc";
    SortDirection["Descending"] = "desc";
})(SortDirection || (SortDirection = {}));
class VideoList extends React.Component {
    render() {
        const { sorted } = this;
        const percents = sorted.map(vid => vid.percent);
        let chartScale = Math.max(0, ...percents) / 100 + 1;
        if (chartScale < 2)
            chartScale = 2;
        const snapshotCounts = sorted.map(vid => {
            return vid.video.snapshots.length;
        });
        const maxSnapshotCount = Math.max(0, ...snapshotCounts);
        const videos = sorted.map(vid => {
            return (React.createElement(Video_1.default, { key: vid.video.id, video: vid.video, chartScale: chartScale, chartDataPountCount: maxSnapshotCount }));
        });
        return (React.createElement("section", { className: "video-list" },
            React.createElement("nav", null,
                React.createElement("ul", null, this.sortLinks)),
            React.createElement("div", { className: "items" }, videos)));
    }
    get getParams() {
        const { search } = this.props.location;
        if (!search || search.length === 1)
            return {};
        return search
            .slice(1)
            .split('&')
            .reduce((accl, pair) => {
            const [key, value] = pair.split('=').map(decodeURIComponent);
            accl[key] = value;
            return accl;
        }, {});
    }
    get sort() {
        let { sortField: field, sortDirection: direction } = this.getParams;
        const fields = Object.keys(SortField).map(key => {
            return SortField[key];
        });
        const directions = Object.keys(SortDirection).map(key => {
            return SortDirection[key];
        });
        if (!field || fields.indexOf(field) === -1)
            field = SortField.TheOwl;
        if (!direction || directions.indexOf(direction) === -1)
            direction = SortDirection.Descending;
        return { field: field, direction: direction };
    }
    get sortLinks() {
        const sorts = {
            [SortField.TheOwl]: 'As the Owl Flies',
            [SortField.ChangeCount]: 'Count',
            [SortField.PercentChange]: 'Percent',
        };
        return Object.keys(sorts).map(field => {
            const isActive = field === this.sort.field;
            const classes = [];
            if (isActive)
                classes.push('active');
            const sortDirection = isActive && this.sort.direction === SortDirection.Descending
                ? SortDirection.Ascending : SortDirection.Descending;
            classes.push(sortDirection);
            const params = { sortField: field, sortDirection };
            const search = Object.keys(params).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            });
            return (React.createElement("li", { key: field, className: classes.join(' ') },
                React.createElement(Link, { to: {
                        pathname: this.props.location.pathname,
                        search: '?' + search.join('&')
                    } }, sorts[field])));
        });
    }
    get scored() {
        return this.props.activeVideos.map(vid => {
            const start = first(vid.snapshots);
            const end = last(vid.snapshots);
            const startCount = start != null
                ? [start.views, start.likes, start.dislikes, start.favorites,
                    start.comments]
                    .map(Number).reduce((sum, num) => sum + num, 0)
                : 0;
            const endCount = end != null
                ? [end.views, end.likes, end.dislikes, end.favorites, end.comments]
                    .map(Number).reduce((sum, num) => sum + num, 0)
                : 0;
            const change = endCount - startCount;
            const ratio = endCount / startCount;
            return {
                video: vid,
                score: change * Math.pow((ratio - 1), 2),
                percent: (ratio * 100) - 100,
                change,
            };
        });
    }
    get sorted() {
        return this.scored.sort((vid1, vid2) => {
            const { field, direction } = this.sort;
            const [a, b] = direction === SortDirection.Descending
                ? [vid2, vid1] : [vid1, vid2];
            // Field values can be NaN. Prevents items without stats sorting weirdly.
            return (a[field] || 0) - (b[field] || 0);
        });
    }
}
exports.default = createFragmentContainer(VideoList, graphql `
	fragment VideoList_activeVideos on Video @relay(plural: true) {
		id
    snapshots: statsByAge(seconds: $statsAge) {
      views
      likes
      dislikes
      favorites
      comments
    }
		...Video_video
	}
`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlkZW9MaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVmlkZW9MaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3RDLHNDQUFzQztBQUN0QyxvQ0FBb0M7QUFDcEMsK0JBQThCO0FBQzlCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNwQyxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFBO0FBRWxELG1DQUEyQztBQUUzQyx3REFBcUQ7QUFPckQsSUFBSyxTQUlKO0FBSkQsV0FBSyxTQUFTO0lBQ2IsNkJBQWdCLENBQUE7SUFDaEIsc0NBQXlCLENBQUE7SUFDekIsbUNBQXNCLENBQUE7QUFDdkIsQ0FBQyxFQUpJLFNBQVMsS0FBVCxTQUFTLFFBSWI7QUFFRCxJQUFLLGFBR0o7QUFIRCxXQUFLLGFBQWE7SUFDakIsa0NBQWlCLENBQUE7SUFDakIsb0NBQW1CLENBQUE7QUFDcEIsQ0FBQyxFQUhJLGFBQWEsS0FBYixhQUFhLFFBR2pCO0FBZ0JELGVBQWdCLFNBQVEsS0FBSyxDQUFDLFNBQXFCO0lBRWxELE1BQU07UUFDTCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRXZCLE1BQU0sUUFBUSxHQUFhLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN6RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDbkQsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNsQixVQUFVLEdBQUcsQ0FBQyxDQUFBO1FBRWYsTUFBTSxjQUFjLEdBQUcs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TUFBTSxLQUFLLEdBQUssUUFBUSxHQUFHLFVBQVUsQ0FBQTtZQUVyQyxNQUFNLENBQUM7Z0JBQ04sS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLE1BQU0sR0FBRyxTQUFBLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDNUIsT0FBTyxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUc7Z0JBQzVCLE1BQU07YUFDTixDQUFBO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsSUFBWSxNQUFNO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJO1lBQ2xDLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtZQUV0QyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLFNBQVMsS0FBSyxhQUFhLENBQUMsVUFBVTtrQkFDbEQsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFOUIseUVBQXlFO1lBQ3pFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FFRDtBQUdELGtCQUFlLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUE7Ozs7Ozs7Ozs7OztDQVl4RCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IExpbmsgPSByZXF1aXJlKCdmb3VuZC9saWIvTGluaycpXG5pbXBvcnQgZmlyc3QgPSByZXF1aXJlKCdsb2Rhc2gvZmlyc3QnKVxuaW1wb3J0IGxhc3QgPSByZXF1aXJlKCdsb2Rhc2gvbGFzdCcpXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmNvbnN0IFJlbGF5ID0gcmVxdWlyZSgncmVhY3QtcmVsYXknKVxuY29uc3QgeyBjcmVhdGVGcmFnbWVudENvbnRhaW5lciwgZ3JhcGhxbCB9ID0gUmVsYXlcblxuaW1wb3J0IFZpZGVvLCB7IFZpZGVvUHJvcHMgfSBmcm9tICcuL1ZpZGVvJ1xuXG5pbXBvcnQgJy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZpZGVvTGlzdC9zdHlsZS5wY3NzJ1xuXG5cbmludGVyZmFjZSBWaWRlb1Byb3BzMiBleHRlbmRzIFZpZGVvUHJvcHMge1xuXHRpZCxcbn1cblxuZW51bSBTb3J0RmllbGQge1xuXHRUaGVPd2wgPSAnc2NvcmUnLFxuXHRQZXJjZW50Q2hhbmdlID0gJ3BlcmNlbnQnLFxuXHRDaGFuZ2VDb3VudCA9ICdjaGFuZ2UnLFxufVxuXG5lbnVtIFNvcnREaXJlY3Rpb24ge1xuXHRBc2NlbmRpbmcgPSAnYXNjJyxcblx0RGVzY2VuZGluZyA9ICdkZXNjJyxcbn1cblxuaW50ZXJmYWNlIFByb3BzIHtcblx0YWN0aXZlVmlkZW9zOiBWaWRlb1Byb3BzMltdXG5cdHNvcnQ/OiB7IGZpZWxkOiBTb3J0RmllbGQsIGRpcmVjdGlvbj86IFNvcnREaXJlY3Rpb24gfVxuXHRsb2NhdGlvbjoge1xuXHRcdGFjdGlvbjogc3RyaW5nLFxuXHRcdGRlbHRhPzogbnVtYmVyLFxuXHRcdGhhc2g6IHN0cmluZyxcblx0XHRpbmRleD86IG51bWJlcixcblx0XHRrZXk/OiBzdHJpbmcsXG5cdFx0cGF0aG5hbWU6IHN0cmluZyxcblx0XHRzZWFyY2g6IHN0cmluZyxcblx0fVxufVxuXG5jbGFzcyBWaWRlb0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHMsIGFueT4ge1xuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7IHNvcnRlZCB9ID0gdGhpc1xuXG5cdFx0Y29uc3QgcGVyY2VudHM6IG51bWJlcltdID0gc29ydGVkLm1hcCh2aWQgPT4gdmlkLnBlcmNlbnQpXG5cdFx0bGV0IGNoYXJ0U2NhbGUgPSBNYXRoLm1heCgwLCAuLi5wZXJjZW50cykgLyAxMDAgKyAxXG5cdFx0aWYgKGNoYXJ0U2NhbGUgPCAyKVxuXHRcdFx0Y2hhcnRTY2FsZSA9IDJcblxuXHRcdGNvbnN0IHNuYXBzaG90Q291bnRzID0gc29ydGVkLm1hcCh2aWQgPT4ge1xuXHRcdFx0cmV0dXJuIHZpZC52aWRlby5zbmFwc2hvdHMubGVuZ3RoXG5cdFx0fSlcblx0XHRjb25zdCBtYXhTbmFwc2hvdENvdW50ID0gTWF0aC5tYXgoMCwgLi4uc25hcHNob3RDb3VudHMpXG5cblx0XHRjb25zdCB2aWRlb3MgPSBzb3J0ZWQubWFwKHZpZCA9PiB7IHJldHVybiAoXG5cdFx0XHQ8VmlkZW8ga2V5PXt2aWQudmlkZW8uaWR9IHZpZGVvPXt2aWQudmlkZW99XG5cdFx0XHQgICAgICAgY2hhcnRTY2FsZT17Y2hhcnRTY2FsZX0gY2hhcnREYXRhUG91bnRDb3VudD17bWF4U25hcHNob3RDb3VudH0gLz5cblx0XHQpfSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJ2aWRlby1saXN0XCI+XG5cdFx0XHRcdDxuYXY+XG5cdFx0XHRcdFx0PHVsPlxuXHRcdFx0XHRcdFx0e3RoaXMuc29ydExpbmtzfVxuXHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdDwvbmF2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIml0ZW1zXCI+XG5cdFx0XHRcdFx0e3ZpZGVvc31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L3NlY3Rpb24+XG5cdFx0KVxuXHR9XG5cblx0cHJpdmF0ZSBnZXQgZ2V0UGFyYW1zKCk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9IHtcblx0XHRjb25zdCB7IHNlYXJjaCB9ID0gdGhpcy5wcm9wcy5sb2NhdGlvblxuXG5cdFx0aWYgKCFzZWFyY2ggfHwgc2VhcmNoLmxlbmd0aCA9PT0gMSlcblx0XHRcdHJldHVybiB7fVxuXG5cdFx0cmV0dXJuIHNlYXJjaFxuXHRcdFx0LnNsaWNlKDEpXG5cdFx0XHQuc3BsaXQoJyYnKVxuXHRcdFx0LnJlZHVjZSgoYWNjbCwgcGFpcikgPT4ge1xuXHRcdFx0XHRjb25zdCBba2V5LCB2YWx1ZV0gPSBwYWlyLnNwbGl0KCc9JykubWFwKGRlY29kZVVSSUNvbXBvbmVudClcblx0XHRcdFx0YWNjbFtrZXldID0gdmFsdWVcblx0XHRcdFx0cmV0dXJuIGFjY2xcblx0XHRcdH0sIHt9KVxuXHR9XG5cblx0cHJpdmF0ZSBnZXQgc29ydCgpOiB7IGZpZWxkOiBTb3J0RmllbGQsIGRpcmVjdGlvbjogU29ydERpcmVjdGlvbiB9IHtcblx0XHRsZXQgeyBzb3J0RmllbGQ6IGZpZWxkLCBzb3J0RGlyZWN0aW9uOiBkaXJlY3Rpb24gfSA9IHRoaXMuZ2V0UGFyYW1zXG5cblx0XHRjb25zdCBmaWVsZHMgPSBPYmplY3Qua2V5cyhTb3J0RmllbGQpLm1hcChrZXkgPT4ge1xuXHRcdFx0cmV0dXJuIFNvcnRGaWVsZFtrZXldXG5cdFx0fSlcblx0XHRjb25zdCBkaXJlY3Rpb25zID0gT2JqZWN0LmtleXMoU29ydERpcmVjdGlvbikubWFwKGtleSA9PiB7XG5cdFx0XHRyZXR1cm4gU29ydERpcmVjdGlvbltrZXldXG5cdFx0fSlcblxuXHRcdGlmICghZmllbGQgfHwgZmllbGRzLmluZGV4T2YoZmllbGQpID09PSAtMSlcblx0XHRcdGZpZWxkID0gU29ydEZpZWxkLlRoZU93bFxuXHRcdGlmICghZGlyZWN0aW9uIHx8IGRpcmVjdGlvbnMuaW5kZXhPZihkaXJlY3Rpb24pID09PSAtMSlcblx0XHRcdGRpcmVjdGlvbiA9IFNvcnREaXJlY3Rpb24uRGVzY2VuZGluZ1xuXG5cdFx0cmV0dXJuIHsgZmllbGQ6IGZpZWxkIGFzIFNvcnRGaWVsZCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gYXMgU29ydERpcmVjdGlvbiB9XG5cdH1cblxuXHRwcml2YXRlIGdldCBzb3J0TGlua3MoKSB7XG5cdFx0Y29uc3Qgc29ydHMgPSB7XG5cdFx0XHRbU29ydEZpZWxkLlRoZU93bF06ICdBcyB0aGUgT3dsIEZsaWVzJyxcblx0XHRcdFtTb3J0RmllbGQuQ2hhbmdlQ291bnRdOiAnQ291bnQnLFxuXHRcdFx0W1NvcnRGaWVsZC5QZXJjZW50Q2hhbmdlXTogJ1BlcmNlbnQnLFxuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhzb3J0cykubWFwKGZpZWxkID0+IHtcblx0XHRcdGNvbnN0IGlzQWN0aXZlID0gZmllbGQgPT09IHRoaXMuc29ydC5maWVsZFxuXHRcdFx0Y29uc3QgY2xhc3Nlczogc3RyaW5nW10gPSBbXVxuXG5cdFx0XHRpZiAoaXNBY3RpdmUpXG5cdFx0XHRcdGNsYXNzZXMucHVzaCgnYWN0aXZlJylcblxuXHRcdFx0Y29uc3Qgc29ydERpcmVjdGlvbiA9XG5cdFx0XHRcdGlzQWN0aXZlICYmIHRoaXMuc29ydC5kaXJlY3Rpb24gPT09IFNvcnREaXJlY3Rpb24uRGVzY2VuZGluZ1xuXHRcdFx0XHQ/IFNvcnREaXJlY3Rpb24uQXNjZW5kaW5nIDogU29ydERpcmVjdGlvbi5EZXNjZW5kaW5nXG5cdFx0XHRjbGFzc2VzLnB1c2goc29ydERpcmVjdGlvbilcblxuXHRcdFx0Y29uc3QgcGFyYW1zID0geyBzb3J0RmllbGQ6IGZpZWxkLCBzb3J0RGlyZWN0aW9uIH1cblx0XHRcdGNvbnN0IHNlYXJjaCA9IE9iamVjdC5rZXlzKHBhcmFtcykubWFwKGtleSA9PiB7XG5cdFx0XHRcdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XSlcblx0XHRcdH0pXG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxsaSBrZXk9e2ZpZWxkfSBjbGFzc05hbWU9e2NsYXNzZXMuam9pbignICcpfT5cblx0XHRcdFx0XHQ8TGluayB0bz17e1xuXHRcdFx0XHRcdFx0cGF0aG5hbWU6IHRoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWUsXG5cdFx0XHRcdFx0XHRzZWFyY2g6ICc/JyArIHNlYXJjaC5qb2luKCcmJylcblx0XHRcdFx0XHR9fT5cblx0XHRcdFx0XHRcdHtzb3J0c1tmaWVsZF19XG5cdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0XHQ8L2xpPlxuXHRcdFx0KVxuXHRcdH0pXG5cdH1cblxuXHRwcml2YXRlIGdldCBzY29yZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuYWN0aXZlVmlkZW9zLm1hcCh2aWQgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnQgPSBmaXJzdCh2aWQuc25hcHNob3RzKVxuXHRcdFx0Y29uc3QgZW5kICA9IGxhc3QodmlkLnNuYXBzaG90cylcblxuXHRcdFx0Y29uc3Qgc3RhcnRDb3VudCA9IHN0YXJ0ICE9IG51bGxcblx0XHRcdFx0PyBbc3RhcnQudmlld3MsIHN0YXJ0Lmxpa2VzLCBzdGFydC5kaXNsaWtlcywgc3RhcnQuZmF2b3JpdGVzLFxuXHRcdFx0XHRcdHN0YXJ0LmNvbW1lbnRzXVxuXHRcdFx0XHRcdC5tYXAoTnVtYmVyKS5yZWR1Y2UoKHN1bSwgbnVtKSA9PiBzdW0gKyBudW0sIDApXG5cdFx0XHRcdDogMFxuXHRcdFx0Y29uc3QgZW5kQ291bnQgPSBlbmQgIT0gbnVsbFxuXHRcdFx0XHQ/IFtlbmQudmlld3MsIGVuZC5saWtlcywgZW5kLmRpc2xpa2VzLCBlbmQuZmF2b3JpdGVzLCBlbmQuY29tbWVudHNdXG5cdFx0XHRcdFx0Lm1hcChOdW1iZXIpLnJlZHVjZSgoc3VtLCBudW0pID0+IHN1bSArIG51bSwgMClcblx0XHRcdFx0OiAwXG5cblx0XHRcdGNvbnN0IGNoYW5nZSAgPSBlbmRDb3VudCAtIHN0YXJ0Q291bnRcblx0XHRcdGNvbnN0IHJhdGlvICAgPSBlbmRDb3VudCAvIHN0YXJ0Q291bnRcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dmlkZW86IHZpZCxcblx0XHRcdFx0c2NvcmU6IGNoYW5nZSAqIChyYXRpby0xKSoqMixcblx0XHRcdFx0cGVyY2VudDogKHJhdGlvICogMTAwKSAtIDEwMCxcblx0XHRcdFx0Y2hhbmdlLFxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRwcml2YXRlIGdldCBzb3J0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2NvcmVkLnNvcnQoKHZpZDEsIHZpZDIpID0+IHtcblx0XHRcdGNvbnN0IHsgZmllbGQsIGRpcmVjdGlvbiB9ID0gdGhpcy5zb3J0XG5cblx0XHRcdGNvbnN0IFthLCBiXSA9IGRpcmVjdGlvbiA9PT0gU29ydERpcmVjdGlvbi5EZXNjZW5kaW5nXG5cdFx0XHRcdD8gW3ZpZDIsIHZpZDFdIDogW3ZpZDEsIHZpZDJdXG5cblx0XHRcdC8vIEZpZWxkIHZhbHVlcyBjYW4gYmUgTmFOLiBQcmV2ZW50cyBpdGVtcyB3aXRob3V0IHN0YXRzIHNvcnRpbmcgd2VpcmRseS5cblx0XHRcdHJldHVybiAoYVtmaWVsZF0gfHwgMCkgLSAoYltmaWVsZF0gfHwgMClcblx0XHR9KVxuXHR9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGcmFnbWVudENvbnRhaW5lcihWaWRlb0xpc3QsIGdyYXBocWxgXG5cdGZyYWdtZW50IFZpZGVvTGlzdF9hY3RpdmVWaWRlb3Mgb24gVmlkZW8gQHJlbGF5KHBsdXJhbDogdHJ1ZSkge1xuXHRcdGlkXG4gICAgc25hcHNob3RzOiBzdGF0c0J5QWdlKHNlY29uZHM6ICRzdGF0c0FnZSkge1xuICAgICAgdmlld3NcbiAgICAgIGxpa2VzXG4gICAgICBkaXNsaWtlc1xuICAgICAgZmF2b3JpdGVzXG4gICAgICBjb21tZW50c1xuICAgIH1cblx0XHQuLi5WaWRlb192aWRlb1xuXHR9XG5gKVxuIl19