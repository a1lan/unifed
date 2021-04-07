/*
 * CS3099 Group A3
 */

import { render, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SubscribeButton, subscribeQuery, unsubscribeQuery } from "./SubscribeButton";

test("Render SubscribeButton on unsubscribed community", async () => {
  const { getByText } = render(
    <MockedProvider>
      <SubscribeButton id={"foo"} server={"bar"} isSubscribed={false} />
    </MockedProvider>,
  );
  getByText("Subscribe");
});

test("Render SubscribeButton on subscribed community", async () => {
  const { getByText } = render(
    <MockedProvider>
      <SubscribeButton id={"foo"} server={"bar"} isSubscribed={true} />
    </MockedProvider>,
  );
  getByText("Unsubscribe");
});

test("Subscribe and unsubscribe", async () => {
  const mocks = [
    {
      request: {
        query: subscribeQuery,
        variables: { id: "foo", host: "bar" },
      },
      result: {
        data: {
          subscribe: true,
        },
      },
    },
    {
      request: {
        query: unsubscribeQuery,
        variables: { id: "foo", host: "bar" },
      },
      result: {
        data: {
          unsubscribe: true,
        },
      },
    },
  ];

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SubscribeButton id={"foo"} server={"bar"} isSubscribed={false} />
    </MockedProvider>,
  );

  fireEvent.click(getByText("Subscribe"));
  expect(getByText("Unsubscribe").closest("button")).toBeDisabled();
  await waitFor(() => {
    expect(getByText("Unsubscribe").closest("button")).not.toBeDisabled();
  });
  fireEvent.click(getByText("Unsubscribe"));
  expect(getByText("Subscribe").closest("button")).toBeDisabled();
  await waitFor(() => {
    expect(getByText("Subscribe").closest("button")).not.toBeDisabled();
  });
});