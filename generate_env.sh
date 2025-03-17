#if ! openssl -v > /dev/null 2>&1; then
#  echo "Please install openssl"
#  exit 1
#fi

openssl genrsa -out private.key 4096
openssl rsa -in private.key -pubout -outform PEM -out public.key

set JWT_PRIVATE_KEY "$(cat private.key | base64)"
set JWT_PUBLIC_KEY "$(cat public.key | base64)"

rm private.key
rm public.key

cp .env.example .env.local

sed -E "s|(JWT_PRIVATE_KEY=).*|\1$JWT_PRIVATE_KEY|" .env.local | sed -E "s|(JWT_PUBLIC_KEY=).*|\1$JWT_PUBLIC_KEY|" > .env.local.tmp
mv .env.local.tmp .env.local

echo "Generated .env.local"