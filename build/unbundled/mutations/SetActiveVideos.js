"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { commitMutation, graphql } = require('react-relay');
const mutation = graphql `
	mutation SetActiveVideosMutation($input: SetActiveVideosInput!) {
		setActiveVideos(input: $input) {
			clientMutationId
		}
	}
`;
let nextClientMutationId = 0;
function commit(environment, ids) {
    const clientMutationId = nextClientMutationId++;
    return commitMutation(environment, {
        mutation,
        variables: { input: { ids, clientMutationId } },
        onCompleted: (response) => {
            console.debug('mutation completed', response);
        },
    });
}
exports.default = { commit };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0QWN0aXZlVmlkZW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL211dGF0aW9ucy9TZXRBY3RpdmVWaWRlb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFNLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUcxRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUE7Ozs7OztDQU12QixDQUFBO0FBRUQsSUFBSSxvQkFBb0IsR0FBRyxDQUFDLENBQUE7QUFFNUIsZ0JBQWdCLFdBQVcsRUFBRSxHQUFhO0lBQ3pDLE1BQU0sZ0JBQWdCLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQTtJQUUvQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtRQUNsQyxRQUFRO1FBQ1IsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLEVBQUU7UUFDL0MsV0FBVyxFQUFFLENBQUMsUUFBZ0I7WUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM5QyxDQUFDO0tBQ0QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQUdELGtCQUFlLEVBQUUsTUFBTSxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY29tbWl0TXV0YXRpb24sIGdyYXBocWwgfSA9IHJlcXVpcmUoJ3JlYWN0LXJlbGF5JylcblxuXG5jb25zdCBtdXRhdGlvbiA9IGdyYXBocWxgXG5cdG11dGF0aW9uIFNldEFjdGl2ZVZpZGVvc011dGF0aW9uKCRpbnB1dDogU2V0QWN0aXZlVmlkZW9zSW5wdXQhKSB7XG5cdFx0c2V0QWN0aXZlVmlkZW9zKGlucHV0OiAkaW5wdXQpIHtcblx0XHRcdGNsaWVudE11dGF0aW9uSWRcblx0XHR9XG5cdH1cbmBcblxubGV0IG5leHRDbGllbnRNdXRhdGlvbklkID0gMFxuXG5mdW5jdGlvbiBjb21taXQoZW52aXJvbm1lbnQsIGlkczogc3RyaW5nW10pIHtcblx0Y29uc3QgY2xpZW50TXV0YXRpb25JZCA9IG5leHRDbGllbnRNdXRhdGlvbklkKytcblxuXHRyZXR1cm4gY29tbWl0TXV0YXRpb24oZW52aXJvbm1lbnQsIHtcblx0XHRtdXRhdGlvbixcblx0XHR2YXJpYWJsZXM6IHsgaW5wdXQ6IHsgaWRzLCBjbGllbnRNdXRhdGlvbklkIH0gfSxcblx0XHRvbkNvbXBsZXRlZDogKHJlc3BvbnNlOiBvYmplY3QpID0+IHtcblx0XHRcdGNvbnNvbGUuZGVidWcoJ211dGF0aW9uIGNvbXBsZXRlZCcsIHJlc3BvbnNlKVxuXHRcdH0sXG5cdH0pXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgeyBjb21taXQgfVxuIl19