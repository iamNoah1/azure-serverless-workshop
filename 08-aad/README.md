# Adding User Authentication

Currently, your frontend website is open to anonymous users. In this lab, you will enable Azure Active Directory OAuth2 authentication in the `statusapp` stack.

Make sure you are still in the `statusapp` folder with the same files that you created in Labs 4-7.

## Step 1 &mdash; Install AzureAD Provider

Azure Active Directory objects are managed by a separate Pulumi provider called `AzureAD`. Install the provider by running

```bash
npm install @pulumi/azuread
```

## Step 2 &mdash; Add an Azure AD Application

Extend the file `website.ts` with the definition of an Azure AD Application:

```ts
import * as azuread from "@pulumi/azuread";

export const tenantId = pulumi.output(azure.core.getClientConfig()).tenantId;
const apiAppName=`${appName}-api`;

const apiApp = new azuread.Application(apiAppName, {
    name: apiAppName,
    oauth2AllowImplicitFlow: true,
    replyUrls: [storageAccountUrl, cdnUrl],
    identifierUris: [`http://${apiAppName}`],
    appRoles: [{  
        allowedMemberTypes: [ "User" ], 
        description:"Access to device status", 
        displayName:"Get Device Status", 
        isEnabled:true,
        value: "GetStatus",
    }],
    requiredResourceAccesses: [{
        resourceAppId: "00000003-0000-0000-c000-000000000000",
        resourceAccesses: [ { id: "e1fe6dd8-ba31-4d61-89e7-88639da4683d", type: "Scope" } ],
    }],
});
export const applicationId = apiApp.applicationId;
```

Note that it lists URLs of the Storage Account and CDN as well-known reply URLs.

> :white_check_mark: After these changes, your files should [look like this](./code/step2).

## Step 3 &mdash; Adjust the Static Website

Download the zip archive from https://mikhailworkshop.blob.core.windows.net/zips/droneapp-auth.zip. It contains the files for the same static website but with authentication enabled.

Extract the contents into the folder `droneapp-auth` under the folder `statusapp`. Make sure that the HTML and JavaScript files are located directly inside `statusapp/droneapp-auth` (not in a subfolder below).

Open the file `websiteFiles.ts`. Change the name of the folder there:

```ts
const folderName = "droneapp-auth";
```

Also, change the `asset` calculation block to populate the tenant ID, client ID, and application ID inside the static files:

```ts
    const asset = pulumi.all([api.apiUrl, website.tenantId, website.applicationId])
        .apply(([url, tenant, app]) => 
            rawText.replace("[API_URL]", url)
                .replace("[TENANT_ID]", tenant)
                .replace("[APP_ID]", app)
                .replace("[CLIENT_ID]", app))
        .apply(text => new pulumi.asset.StringAsset(text));
```

## Step 4 &mdash; Deploy and Test the Stack

Deploy the stack

```bash
$ pulumi up
...
Updating (dev):
...
Resources:
    + 13 created
    - 12 deleted
    +-8 replaced
    33 changes. 18 unchanged
```

Navigate to the website in a browser and make sure that you get a login screen like this one:

![Sign In](./img/auth.png)

Click the "Sign In" button and login with your Azure username and password, then accept the permission request.

Now, the search screen should appear, and you user account is shown in the top-right corner.

## Next Steps

Congratulations! :tada: You have successfully setup Azure AD authentication for your website.

You have completed the labs! You are awesome! :tada:

After you are done with playing with the application, don't forget to clean up the infrastructure by running `pulumi destroy` in both `statusapp` and `telemetry` projects (in this order).