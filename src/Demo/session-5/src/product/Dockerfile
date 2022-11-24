#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/product/product.csproj", "src/product/"]
RUN dotnet restore "src/product/product.csproj"
COPY . .
WORKDIR "/src/src/product"
RUN dotnet build "product.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "product.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "product.dll"]