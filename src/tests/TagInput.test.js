import { describe, it, expect } from "vitest";

import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/vue";
import TagInput from "../components/TagInput/index.vue";
import { fireEvent } from "@testing-library/dom";

describe("Tag Input", () => {
  it("Test custom tag with Enter key", async () => {
    const { getByPlaceholderText } = render(TagInput);

    const input = getByPlaceholderText("Add tags...");

    userEvent.type(input, "This is a test tag");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.value).toBe("");
  });
});

describe("Tag Input", () => {
  it("Test custom tag with comma key", async () => {
    const { getByPlaceholderText } = render(TagInput);

    const input = getByPlaceholderText("Add tags...");

    userEvent.type(input, "This is a comma tag");
    fireEvent.keyDown(input, { key: "," });

    expect(input.value).toBe("");
  });
});``
