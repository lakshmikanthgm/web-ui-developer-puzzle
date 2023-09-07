# Code problems/smell
## Inside api/books/feature
- calling `searchTerm()` method declared in `book-search.component.ts` from a template will cause a performance issue coz the method invoke on each change detection cycle. Instead should use formcontrol `valuechange` with `async` pipe in template - ***Addressed***
- ngrx selector should be created as an observable and used on template with `async pipe` instead of subscribing and assigning to a variable for getting list of books in `book-search.component.ts` - **Addressed**
- `trackBy` for `ngFor` to iterate list of books is missing - **Addressed**
- as mentioned above calling `formatDate()` method declared in `book-search.component.ts` from a template will cause a performance issue and can be replace with `date pipe` - **Addressed**
- `ProductsListComponent` should be replaced with `BookSearchComponent` in `book-search.component.spec.ts` - **Addressed**
- Test case are missing for all the methods declared in `BookSearchComponent`
- `trackBy` for `ngFor` directive to iterate reading list is missing in `reading-list.component.html` template - **Addressed**
- add `shareReplay(1)` for `readingList$` in `reading-list.component.ts` to share the observable when subcribed multiple times in angular template - **Addressed**
- Test case are missing for all the methods declared in `ReadingListComponent`
- remove empty `ngOninit()` method in `total-count.component.ts` - **Addressed**
- delete `total-count.component.scss` coz it is empty file - **Addressed**

## Inside api/books/data-access
- books and reading-list ngrx state related files should be in its own folder for better code structuring/readability - **Addressed**
- Test cases are missing (edge case scenarios as well) and descriptions of some test cases are wrong in below files
    1. `books.effect.spec.ts`
    2. `books.reducer.spec.ts`
    3. `reading-list.effect.spec.ts`
    4. `reading-list.reducers.ts`

# User Experience Improvement
- No Loading icon/message when Search Book API is in progress.
- When user search with text for which API is returning empty/error response is not handled (Edge case scenarios handler is missing on UI)
- Application is not responsive and UI broken for small devices

# Accessibility Issue with LightHouse
- Buttons do not have an accessible name - **Addressed**
- Background and foreground colors do not have a sufficient contrast ratio. - **Addressed**

# Accessibility Issue (Manual Check)
- anchor tag with "Javascript" is not working when user try with keyboard ENTER key - **Addressed**