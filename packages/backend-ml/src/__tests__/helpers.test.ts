/*
 * CS3099 Group A3
 */

import test from "ava";
import os from "os";
import fs, { promises as fsPromises } from "fs";
import { Parser, Message } from "../parsers";
import {
  arrayToCSV,
  flattenMessages,
  ratioSplitArray,
  mergeParsers,
  createDirectory,
} from "../helpers";

test("arrayToCSV empty", (t) => {
  t.is(arrayToCSV([]), "");
});

test("arrayToCSV one row", (t) => {
  t.is(arrayToCSV([["hello", 1]]), "hello,1");
});

test("arrayToCSV two rows", (t) => {
  t.is(
    arrayToCSV([
      ["hello", 1],
      ["world", 2],
    ]),
    "hello,1\nworld,2",
  );
});

test("flattenMessages empty", (t) => {
  t.deepEqual(flattenMessages([]), { sentences: [], labels: [] });
});

test("flattenMessages valid", (t) => {
  const message1: Message = {
    body: "message1",
    spam: false,
  };
  const message2: Message = {
    body: "message2",
    spam: true,
  };

  t.deepEqual(flattenMessages([message1, message2]), {
    sentences: [message1.body, message2.body],
    labels: [0, 1],
  });
});

test("ratioSplitArray empty", (t) => {
  t.deepEqual(ratioSplitArray([], 0.5), [[], []]);
});

test("ratioSplitArray floor", (t) => {
  t.deepEqual(ratioSplitArray([1, 2], 0.99), [[1], [2]]);
});

test("Merge messages", async (t) => {
  const message1: Message = { body: "a", spam: true };
  const message2: Message = { body: "b", spam: false };

  class TestParser implements Parser {
    getMessages(): Promise<Message[]> {
      return new Promise((resolve) => resolve([message1, message2]));
    }
  }

  const merged = await mergeParsers([new TestParser(), new TestParser()]);

  t.deepEqual(merged, [message1, message2, message1, message2]);
});

test("createDirectory new", async (t) => {
  const path = await fsPromises.mkdtemp(os.tmpdir() + "/");
  fs.rmdirSync(path);
  await createDirectory(path);
  t.true(fs.existsSync(path));
});

test("createDirectory already exists", async (t) => {
  const path = await fsPromises.mkdtemp(os.tmpdir() + "/");
  await createDirectory(path);
  t.true(fs.existsSync(path));
});