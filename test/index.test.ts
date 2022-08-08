import type { ExtensionContext, Memento } from "vscode";
import { activate } from "../src/surround";

jest.mock(
  "vscode",
  () => {
    return {
      extensions: {
        getExtension: jest.fn().mockImplementation(() => {
          return {
            packageJSON: {
              version: "dummy-version",
            },
          };
        }),
      },
    };
  },
  { virtual: true }
);

type TestExtensionContext = {
  globalState: Partial<Memento>;
};

const context: TestExtensionContext = {
  globalState: {
    get: jest.fn(),
  },
};

describe("previousVersion is defined", () => {
  it("should read the correct previous version", () => {
    activate(context as ExtensionContext);

    expect(context.globalState.get).toBeCalledWith(
      "yatki.vscode-surround:last-version"
    );
  });
});

it("example", () => {
  expect(5 * 3).toBe(15);
});
