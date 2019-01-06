#### Before you submit this PR for review, make sure the following tasks are complete.

- [ ] Added relevant documentation.
- [ ] Updated unit tests.
- [ ] Made sure all tests are passing with `yarn test`
- [ ] Ensured all code meets the [standard JS](https://standardjs.com) style guide.
- [ ] Removed debug code.
- [ ] Included screenshot if applicable.
- [ ] Squashed changes into a single commit.
- [ ] If adding new routes to the frontend application, specify them below for testing

    ```
    git rebase -i $(git merge-base HEAD master)
    git push origin NAME_OF_BRANCH --force-with-lease
    ```
