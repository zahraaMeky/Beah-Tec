"""A simple example of how to access the Google Analytics API."""

from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials


def get_service(api_name, api_version, scopes, key_file_location):
    """Get a service that communicates to a Google API.

    Args:
        api_name: The name of the api to connect to.
        api_version: The api version to connect to.
        scopes: A list auth scopes to authorize for the application.
        key_file_location: The path to a valid service account JSON key file.

    Returns:
        A service that is connected to the specified API.
    """

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            key_file_location, scopes=scopes)

    # Build the service object.
    service = build(api_name, api_version, credentials=credentials)

    return service


def get_first_profile_id(service):
    # Use the Analytics service object to get the first profile id.

    # Get a list of all Google Analytics accounts for this user
    accounts = service.management().accounts().list().execute()

    if accounts.get('items'):
        # Get the first Google Analytics account.
        account = accounts.get('items')[0].get('id')

        # Get a list of all the properties for the first account.
        properties = service.management().webproperties().list(
                accountId=account).execute()

        if properties.get('items'):
            # Get the first property id.
            property = properties.get('items')[0].get('id')

            # Get a list of all views (profiles) for the first property.
            profiles = service.management().profiles().list(
                    accountId=account,
                    webPropertyId=property).execute()

            if profiles.get('items'):
                # return the first view (profile) id.
                return profiles.get('items')[0].get('id')

    return None


def get_results(service, profile_id):
    # Use the Analytics Service Object to query the Core Reporting API
    # for the number of sessions within the past seven days.
    return service.data().ga().get(
            ids='ga:' + profile_id,
            start_date='30daysAgo',
            end_date='today',
            metrics='ga:users').execute()


def print_results(results):
    # Print data nicely for the user.
    print(results)
    if results:
        print ('View (Profile):', results.get('profileInfo').get('profileName'))
        print ('Total Sessions:', results.get('rows')[0][0])

    else:
        print ('No results found')


def main():
    # Define the auth scopes to request.
    scope = 'https://www.googleapis.com/auth/analytics.readonly'
    # beah-tec-e29caf80ace1
    key_file_location = 'beah-tec-3a162d626126.json'
    # key_file_location = 'beah-tec-e29caf80ace1.json'

    # Authenticate and construct service.
    service = get_service(
            api_name='analytics',
            api_version='v3',
            scopes=[scope],
            key_file_location=key_file_location)

    profile_id = get_first_profile_id(service)
    print_results(get_results(service, profile_id))

import requests

# https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.a0Aa4xrXO1kDuSgvTiWDsq4tTivlr80M9f2YT4vliUBDTp4uMATNsAVool4R7MTQkRmBoV_-P5UCYMTVpCA94vXxQzqxEnjZ4ieVlkNGzsQJeL_baXE2Ni33kLnhNR3RKAmCcXG9VARu9eZQvjoQ49DV_1iF5cxt4aCgYKATASARESFQEjDvL9xj0TeylLAfwfmoNCJuiCtg0166&ids=ga%3A277973294&metrics=ga%3Ausers%2Cga%3AnewUsers%2Cga%3Asessions&start-date=2022-10-01&end-date=today
def main2():
    r = requests.get('https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.a0Aa4xrXO1kDuSgvTiWDsq4tTivlr80M9f2YT4vliUBDTp4uMATNsAVool4R7MTQkRmBoV_-P5UCYMTVpCA94vXxQzqxEnjZ4ieVlkNGzsQJeL_baXE2Ni33kLnhNR3RKAmCcXG9VARu9eZQvjoQ49DV_1iF5cxt4aCgYKATASARESFQEjDvL9xj0TeylLAfwfmoNCJuiCtg0166&ids=ga%3A277973294&metrics=ga%3Ausers%2Cga%3AnewUsers%2Cga%3Asessions&start-date=2022-10-01&end-date=today')
    if (r.status_code==200):
        data = r.json()
        visitors = data['rows'][0][0]
        print(visitors)

if __name__ == '__main__':
    main2()
