# Modals

## Using Modals

- The "useModal" hook will provide openModal and closeModal functions.
- openModal(MODAL_NAME, props) opens a modal with the provided props
- the onRequestClose prop is automatically provided to the modal content and defaults to just closing the modal but can be overridden from props
- the onAfterClose prop for the modal itself can be set from props as well
- closeModal(MODAL_NAME) closes the modal

## Making Modals

- To make a modal, just make the content of the modal and put it into src/constants/modal similarly to all the other modals in there already

## Notes

- The modal controller component was designed so that every component can open one of each modal
