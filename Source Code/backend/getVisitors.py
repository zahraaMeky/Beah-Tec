from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from pathlib import Path

def get_service(api_name, api_version, scopes, key_file_location):
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            key_file_location, scopes=scopes)
    # Build the service object.
    service = build(api_name, api_version, credentials=credentials)
    return service


def get_first_profile_id(service):
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
    return service.data().ga().get(
            ids='ga:' + profile_id,
            start_date='2022-10-01',
            end_date='today',
            metrics='ga:users').execute()


def print_results(results):
    # Print data nicely for the user.
    if results:
        print ('View (Profile):', results.get('profileInfo').get('profileName'))
        print ('Total Sessions:', results.get('rows')[0][0])
    else:
        print ('No results found')

    return results.get('rows')[0][0]


def main():
    # Define the auth scopes to request.
    scope = 'https://www.googleapis.com/auth/analytics.readonly'
    BASE_DIR = Path(__file__).resolve().parent
    key_file_location = str(BASE_DIR) + '/beah-tec-3a162d626126.json'

    # Authenticate and construct service.
    service = get_service(
            api_name='analytics',
            api_version='v3',
            scopes=[scope],
            key_file_location=key_file_location)

    profile_id = get_first_profile_id(service)
    visitors = print_results(get_results(service, profile_id))


if __name__ == '__main__':
    main()
