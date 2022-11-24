#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/account/account.csproj", "src/account/"]
RUN dotnet restore "src/account/account.csproj"
COPY . .
WORKDIR "/src/src/account"
RUN dotnet build "account.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "account.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "account.dll"]