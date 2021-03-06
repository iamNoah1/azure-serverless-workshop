// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

import React from "react"
import { ActionButton, css, classNamesFunction, IButtonProps, IStyle, Stack, Text, Link } from "office-ui-fabric-react"
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

import { DroneStatusDetailsList } from "../components/drone-status"

type IndexStyleProps = {};

interface IndexStyles {
  mainStackContent?: IStyle;
  loginActionButton?: IStyle;
}

const mainPageStyles: IndexStyles = {
 loginActionButton: [
    'ms-BasicButtonsExample',
    {
      selectors: {
        '.ms-Button': {
          margin: '10px 0'
        }
      }
    }
  ]
};

const getClassNames = classNamesFunction<IndexStyleProps, IndexStyles>();
const classNames = getClassNames(mainPageStyles, {});


const titleStyle = { root: { fontSize: FontSizes.size42 } }
const descStyle = { root: { fontSize: FontSizes.size18 } }

const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: "960px",
          margin: "0 auto",
          textAlign: "center",
          color: "#605e5c",
        },
      }}
      gap={15}>
      <Stack.Item align="end">
      </Stack.Item>
      <Stack.Item align="start">
        <Text styles={titleStyle}>
          Welcome to Fabrikam Drone Status App
        </Text>
      </Stack.Item>
      <Stack.Item align="start">
        <Text styles={descStyle}>
        This sample demonstrates how to call a serverless API.
        </Text>
      </Stack.Item>
      <Stack.Item align="start">
        <DroneStatusDetailsList />
      </Stack.Item>
    </Stack>
  )
}

export default App